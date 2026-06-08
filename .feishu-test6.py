#!/usr/bin/env python3
"""Check bot membership in Solalab group and try sending"""
import json, os, requests

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')

resp = requests.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    json={'app_id': app_id, 'app_secret': app_secret}, timeout=10)
token = resp.json().get('tenant_access_token', '')

chat_id = 'oc_f7119b6969f746e9699c0d384716ed0e'
bot_open_id = 'ou_73242ac0ab7574add81c7f88c70b088f'

# Get chat members
members_resp = requests.get(
    f'https://open.feishu.cn/open-apis/im/v1/chats/{chat_id}/members?page_size=50',
    headers={'Authorization': f'Bearer {token}'}, timeout=15
)
print('Members status:', members_resp.status_code)
print('Members response:', json.dumps(members_resp.json(), indent=2)[:600])

# Try sending a text message first (simpler than card)
text_payload = {
    'receive_id': chat_id,
    'msg_type': 'text',
    'content': json.dumps({'text': 'Hello from Hermes WC updater test!'})
}

r = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json=text_payload, timeout=15
)
print('\nText message status:', r.status_code)
print('Text message response:', r.text[:300])
