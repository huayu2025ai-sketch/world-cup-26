#!/usr/bin/env python3
"""Create DM chat with user and send card"""
import json, os, requests

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')

# Get token
resp = requests.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    json={'app_id': app_id, 'app_secret': app_secret}, timeout=10)
token = resp.json().get('tenant_access_token', '')
print('Token:', token[:20] + '...')

user_id = 'oc_5a70e642f7a048e8e629194ce6236a74'

# Step 1: Search for existing DM chat with this user
search_resp = requests.get(
    'https://open.feishu.cn/open-apis/im/v1/chats?user_id_type=open_id&page_size=20',
    headers={'Authorization': f'Bearer {token}'},
    timeout=15
)
print('Search chats status:', search_resp.status_code)
if search_resp.status_code == 200:
    data = search_resp.json()
    if data.get('code') == 0:
        items = data.get('data', {}).get('items', [])
        for item in items:
            print('Chat:', item.get('name'), item.get('chat_id'), item.get('chat_type'))
    else:
        print('Search error:', data.get('msg'))
        print('Full:', json.dumps(data)[:300])

# Step 2: Try to create a DM chat
create_resp = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/chats',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={
        'chat_mode': 'p2p',
        'chat_type': 'private',
        'user_id_list': [user_id]
    },
    timeout=15
)
print('\nCreate DM status:', create_resp.status_code)
print('Create DM response:', json.dumps(create_resp.json())[:500])
