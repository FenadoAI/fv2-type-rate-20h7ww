"""Test currency conversion API endpoints."""

import os
import sys
from pathlib import Path

import requests
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / ".env")

# API Configuration
API_BASE_URL = "http://localhost:8001/api"


def test_currency_rates():
    """Test GET /api/currency/rates endpoint."""
    print("\n=== Testing GET /api/currency/rates ===")

    response = requests.get(f"{API_BASE_URL}/currency/rates?base_currency=USD")
    print(f"Status Code: {response.status_code}")

    if response.status_code == 200:
        data = response.json()
        print(f"Success: {data.get('success')}")
        print(f"Base Currency: {data.get('base_currency')}")
        print(f"Number of rates: {len(data.get('rates', {}))}")

        # Check for some popular currencies
        rates = data.get('rates', {})
        popular = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD']
        for curr in popular:
            if curr in rates:
                print(f"  {curr}: {rates[curr].get('value')}")

        assert data.get('success') == True, "API call should be successful"
        assert len(rates) > 0, "Should return exchange rates"
        print("✓ Currency rates test PASSED")
    else:
        print(f"Error: {response.text}")
        assert False, f"API call failed with status {response.status_code}"


def test_currency_convert():
    """Test POST /api/currency/convert endpoint."""
    print("\n=== Testing POST /api/currency/convert ===")

    payload = {
        "from_currency": "USD",
        "to_currency": "EUR",
        "amount": 100.0
    }

    response = requests.post(f"{API_BASE_URL}/currency/convert", json=payload)
    print(f"Status Code: {response.status_code}")

    if response.status_code == 200:
        data = response.json()
        print(f"Success: {data.get('success')}")
        print(f"From: {data.get('amount')} {data.get('from_currency')}")
        print(f"To: {data.get('converted_amount')} {data.get('to_currency')}")
        print(f"Rate: {data.get('rate')}")
        print(f"Timestamp: {data.get('timestamp')}")

        assert data.get('success') == True, "Conversion should be successful"
        assert data.get('converted_amount') > 0, "Converted amount should be positive"
        assert data.get('rate') > 0, "Rate should be positive"
        print("✓ Currency conversion test PASSED")
    else:
        print(f"Error: {response.text}")
        assert False, f"API call failed with status {response.status_code}"


def test_currency_convert_different_pair():
    """Test conversion with different currency pair."""
    print("\n=== Testing POST /api/currency/convert (GBP to JPY) ===")

    payload = {
        "from_currency": "GBP",
        "to_currency": "JPY",
        "amount": 50.0
    }

    response = requests.post(f"{API_BASE_URL}/currency/convert", json=payload)
    print(f"Status Code: {response.status_code}")

    if response.status_code == 200:
        data = response.json()
        print(f"Success: {data.get('success')}")
        print(f"From: {data.get('amount')} {data.get('from_currency')}")
        print(f"To: {data.get('converted_amount')} {data.get('to_currency')}")
        print(f"Rate: {data.get('rate')}")

        assert data.get('success') == True, "Conversion should be successful"
        assert data.get('converted_amount') > 0, "Converted amount should be positive"
        print("✓ Different currency pair test PASSED")
    else:
        print(f"Error: {response.text}")
        assert False, f"API call failed with status {response.status_code}"


if __name__ == "__main__":
    # Check if API key is configured
    api_key = os.getenv("CURRENCYAPI_KEY")
    if not api_key:
        print("ERROR: CURRENCYAPI_KEY not set in .env file")
        print("Please add your CurrencyAPI key to backend/.env")
        sys.exit(1)

    print(f"Testing Currency API endpoints at {API_BASE_URL}")
    print("Make sure the server is running: cd backend && uvicorn server:app --reload --port 8001")

    try:
        test_currency_rates()
        test_currency_convert()
        test_currency_convert_different_pair()
        print("\n✓✓✓ All currency API tests PASSED ✓✓✓")
    except AssertionError as e:
        print(f"\n✗✗✗ Test FAILED: {e} ✗✗✗")
        sys.exit(1)
    except requests.exceptions.ConnectionError:
        print("\n✗✗✗ Connection Error: Is the server running? ✗✗✗")
        print("Start server: cd backend && uvicorn server:app --reload --port 8001")
        sys.exit(1)
    except Exception as e:
        print(f"\n✗✗✗ Unexpected error: {e} ✗✗✗")
        sys.exit(1)
