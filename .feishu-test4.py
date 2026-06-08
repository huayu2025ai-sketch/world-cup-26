#!/usr/bin/env python3
"""Direct test of Feishu send to group chat"""
import json, os, requests

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')

# Get token
resp = requests.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    json={'app_id': app_id, 'app_secret': app_secret}, timeout=10)
token = resp.json().get('tenant_access_token', '')
print('Token OK')

chat_id = 'oc_f7119b6969f746e9699c0d384716ed0e'
url = f'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id'
print('URL:', url)

card = {
    'msg_type': 'interactive',
    'chat_id': chat_id,
    'content': json.dumps({
        'config': {'wide_screen_mode': True},
        'header': {'title': {'tag': 'plain_text', 'content': 'Test'}, 'template': 'purple'},
        'elements': [{'tag': 'div', 'text': 'Hello from direct test'}]
    })
}
print('Payload:', json.dumps(card, ensure_ascii=False)[:200])

r2 = requests.post(url, headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}, json=card, timeout=15)
print('Status:', r2.status_code)
print('Response:', r2.text[:500])
