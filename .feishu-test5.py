#!/usr/bin/env python3
"""Check bot info and try to find valid chat IDs"""
import json, os, requests

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')

# Get token
resp = requests.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    json={'app_id': app_id, 'app_secret': app_secret}, timeout=10)
token = resp.json().get('tenant_access_token', '')

# Get bot info
bot_resp = requests.get('https://open.feishu.cn/open-apis/bot/v3/info',
    headers={'Authorization': f'Bearer {token}'}, timeout=15)
print('Bot info:', json.dumps(bot_resp.json(), indent=2)[:500])

# Get messages from the Solalab group
chat_id = 'oc_f7119b6969f746e9699c0d384716ed0e'
msgs_resp = requests.get(
    f'https://open.feishu.cn/open-apis/im/v1/messages?container_id_type=chat&container_id={chat_id}&page_size=5',
    headers={'Authorization': f'Bearer {token}'}, timeout=15
)
print('\nMessages status:', msgs_resp.status_code)
if msgs_resp.status_code != 200:
    print('Messages error:', msgs_resp.text[:300])

# Try sending to Solalab group by name
group_resp = requests.get(
    'https://open.feishu.cn/open-apis/im/v1/chats?page_size=50',
    headers={'Authorization': f'Bearer {token}'}, timeout=15
)
print('\nAll chats status:', group_resp.status_code)
if group_resp.status_code == 200:
    data = group_resp.json()
    if data.get('code') == 0:
        items = data.get('data', {}).get('items', [])
        for item in items:
            print(' - Chat:', item.get('name'), '| ID:', item.get('chat_id'), '| Type:', item.get('chat_type'), '| ID bytes:', item.get('chat_id', '')[:3])
    else:
        print('Error:', data.get('msg'))
