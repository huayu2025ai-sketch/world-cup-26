#!/usr/bin/env python3
"""Test card with ASCII only"""
import json, os, requests

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')
resp = requests.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    json={'app_id': app_id, 'app_secret': app_secret}, timeout=10)
token = resp.json().get('tenant_access_token', '')

chat_id = 'oc_f7119b6969f746e9699c0d384716ed0e'

# Test with ASCII-only card
card_ascii = json.dumps({
    'config': {'wide_screen_mode': True},
    'header': {'title': {'tag': 'plain_text', 'content': 'World Cup Update'}, 'template': 'purple'},
    'elements': [{'tag': 'div', 'text': 'Test message'}]
}, ensure_ascii=True)
print('ASCII card:', card_ascii)
r1 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': chat_id, 'msg_type': 'interactive', 'content': card_ascii},
    timeout=15
)
print('ASCII card result:', r1.status_code, r1.text[:200])

# Try sending text first to verify chat is working
r2 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': chat_id, 'msg_type': 'text', 'content': json.dumps({'text': 'ASCII text test'})},
    timeout=15
)
print('Text to chat result:', r2.status_code, r2.text[:200])

# Test: does the Feishu API need a specific Content-Type charset?
r3 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json; charset=utf-8'},
    json={'receive_id': chat_id, 'msg_type': 'text', 'content': json.dumps({'text': 'Unicode test: \u4e16\u754c\u676f'})},
    timeout=15
)
print('Unicode text result:', r3.status_code, r3.text[:200])
