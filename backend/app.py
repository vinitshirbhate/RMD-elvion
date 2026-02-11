import sys
import time
from huggingface_hub import InferenceClient
from huggingface_hub.utils import HfHubHTTPError

from dotenv import load_dotenv
load_dotenv()

# Rate limiting configuration
MAX_REQUESTS_PER_HOUR = 100  # Adjust based on your API tier
request_count = 0
request_window_start = time.time()

def check_rate_limit():
    """Check if we're within rate limits"""
    global request_count, request_window_start
    
    current_time = time.time()
    time_elapsed = current_time - request_window_start
    
    # Reset counter after 1 hour (3600 seconds)
    if time_elapsed >= 3600:
        request_count = 0
        request_window_start = current_time
        return True
    
    # Check if we've exceeded the limit
    if request_count >= MAX_REQUESTS_PER_HOUR:
        time_remaining = 3600 - time_elapsed
        minutes_remaining = int(time_remaining / 60)
        print(f"\n⚠️  Rate limit reached! Please wait {minutes_remaining} minutes.")
        print(f"You've made {request_count} requests in the last hour.")
        return False
    
    return True

def get_rate_limit_info():
    """Get current rate limit status"""
    global request_count, request_window_start
    
    time_elapsed = time.time() - request_window_start
    requests_remaining = MAX_REQUESTS_PER_HOUR - request_count
    
    return {
        'requests_made': request_count,
        'requests_remaining': requests_remaining,
        'time_elapsed_minutes': int(time_elapsed / 60),
        'time_until_reset_minutes': int((3600 - time_elapsed) / 60)
    }

def analyze_text(text, client):
    """Analyze a single text for phishing"""
    global request_count
    
    # Check rate limit before making request
    if not check_rate_limit():
        return None
    
    try:
        result = client.text_classification(
            text,
            model="ealvaradob/bert-finetuned-phishing",
        )
        
        # Increment request counter on successful request
        request_count += 1
        
        classification = result[0]
        label = classification['label']
        confidence = classification['score']
        
        return {
            'label': label,
            'confidence': confidence,
            'is_phishing': label.lower() == 'phishing'
        }
    except HfHubHTTPError as e:
        # Handle HTTP errors from HuggingFace API
        if e.response.status_code == 429:
            print(f"\n❌ API Rate Limit Error: Too many requests.")
            print("Please wait before making more requests.")
            # Try to parse rate limit info from headers if available
            if 'X-RateLimit-Remaining' in e.response.headers:
                remaining = e.response.headers['X-RateLimit-Remaining']
                print(f"Requests remaining: {remaining}")
            if 'X-RateLimit-Reset' in e.response.headers:
                reset_time = e.response.headers['X-RateLimit-Reset']
                print(f"Rate limit resets at: {reset_time}")
        elif e.response.status_code == 503:
            print(f"\n❌ Service Unavailable: The model is currently loading.")
            print("Please try again in a few moments.")
        else:
            print(f"❌ API Error ({e.response.status_code}): {e}")
        return None
    except Exception as e:
        print(f"❌ Error analyzing text: {e}")
        return None

def print_results(text, result):
    """Print analysis results in a formatted way"""
    if result is None:
        return
        
    print(f"\nText: {text[:100]}{'...' if len(text) > 100 else ''}")
    print("-" * 50)
    
    if result['is_phishing']:
        print("🚨 RESULT: PHISHING DETECTED!")
        print(f"Confidence: {result['confidence']:.2%}")
        print("This text appears to be a phishing attempt.")
    else:
        print("✅ RESULT: SAFE")
        print(f"Confidence: {result['confidence']:.2%}")
        print("This text appears to be legitimate.")
    
    print(f"\nFull Details:")
    print(f"   Label: {result['label']}")
    print(f"   Score: {result['confidence']:.4f}")
    
    # Show rate limit info
    limit_info = get_rate_limit_info()
    print(f"\n📊 API Usage:")
    print(f"   Requests made this hour: {limit_info['requests_made']}/{MAX_REQUESTS_PER_HOUR}")
    print(f"   Requests remaining: {limit_info['requests_remaining']}")
    if limit_info['requests_made'] > 0:
        print(f"   Resets in: {limit_info['time_until_reset_minutes']} minutes")
    
    print("=" * 50)

def show_status():
    """Show current API usage status"""
    limit_info = get_rate_limit_info()
    print("\n📊 Current API Status:")
    print(f"   Requests made: {limit_info['requests_made']}/{MAX_REQUESTS_PER_HOUR}")
    print(f"   Requests remaining: {limit_info['requests_remaining']}")
    print(f"   Time elapsed: {limit_info['time_elapsed_minutes']} minutes")
    if limit_info['requests_made'] > 0:
        print(f"   Resets in: {limit_info['time_until_reset_minutes']} minutes")
    print()

def interactive_mode(client):
    """Run the app in interactive mode"""
    print("Phishing Detection Tool - Interactive Mode")
    print("=" * 50)
    print("This tool helps detect phishing attempts in text messages and emails.")
    print("Commands:")
    print("  - Type text to analyze it")
    print("  - Type 'status' to see API usage")
    print("  - Type 'quit' or 'exit' to stop\n")
    
    while True:
        try:
            # Get user input
            user_input = input("Enter text to analyze (or command): ").strip()
            
            # Check for exit commands
            if user_input.lower() in ['quit', 'exit', 'q']:
                print("Goodbye!")
                break
            
            # Check for status command
            if user_input.lower() == 'status':
                show_status()
                continue
            
            # Check for empty input
            if not user_input:
                print("Please enter some text to analyze.\n")
                continue
            
            # Analyze the text
            print("\nAnalyzing text...")
            result = analyze_text(user_input, client)
            print_results(user_input, result)
            print()
            
        except KeyboardInterrupt:
            print("\n\nGoodbye!")
            break
        except EOFError:
            print("\n\nGoodbye!")
            break
        except Exception as e:
            print(f"Error: {e}")
            print("Please try again.\n")

def main():
    """Main function to run the phishing detection app"""
    # Initialize the HuggingFace client
    try:
        client = InferenceClient(
            provider="auto",
        )
        print("✅ Model loaded successfully!")
        print(f"📊 Rate limit: {MAX_REQUESTS_PER_HOUR} requests per hour\n")
    except Exception as e:
        print(f"❌ Error initializing model: {e}")
        return
    
    # Check if text was provided as command line argument
    if len(sys.argv) > 1:
        # Command line mode - analyze the provided text
        text = " ".join(sys.argv[1:])
        print(f"\nAnalyzing: {text[:100]}{'...' if len(text) > 100 else ''}")
        result = analyze_text(text, client)
        print_results(text, result)
    else:
        # Interactive mode
        interactive_mode(client)

if __name__ == "__main__":
    main()