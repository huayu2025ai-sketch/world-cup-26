#!/usr/bin/env python3
"""Debug card content format"""
import json, os, requests

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')
resp = requests.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    json={'app_id': app_id, 'app_secret': app_secret}, timeout=10)
token = resp.json().get('tenant_access_token', '')

chat_id = 'oc_f7119b6969f746e9699c0d384716ed0e'

# Test card without ensure_ascii
card1 = json.dumps({
    'config': {'wide_screen_mode': True},
    'header': {'title': {'tag': 'plain_text', 'content': 'Test'}, 'template': 'purple'},
    'elements': [{'tag': 'div', 'text': 'Hello'}]
})
print('Card1 bytes at 160:', repr(card1[155:165]))

r1 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': chat_id, 'msg_type': 'interactive', 'content': card1},
    timeout=15
)
print('Try 1 (card, no ensure_ascii):', r1.status_code, r1.text[:200])

# Test with card template version
card2 = json.dumps({
    'msg_type': 'interactive',
    'receive_id': chat_id,
    'content': json.dumps({
        'config': {'wide_screen_mode': True},
        'header': {'title': {'tag': 'plain_text', 'content': 'Test'}, 'template': 'purple'},
        'elements': [{'tag': 'div', 'text': 'Hello'}]
    })
})
print('Card2:', card2[:200])
r2 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': chat_id, 'msg_type': 'interactive', 'content': card2},
    timeout=15
)
print('Try 2 (nested content):', r2.status_code, r2.text[:200])
