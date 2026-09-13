import urllib.request
import re

video_ids = [
    'UuwgrixSGLc', 'kFXsXU-x7o4', 'v9uVhfgIVgQ',
    'zhI1Ihg7Ivk', 'Ho_e6ILk2r8', 'PYJDrOkkReM',
    'GRp66Gsc1fc', 'yoZiwq_-yEw', 'RSP2xbr3dQ4',
    '01ZCzrTWOEo', 'v1JDuv7D9so', 'UOTb9F0-82A'
]

for vid in video_ids:
    try:
        url = f'https://www.youtube.com/watch?v={vid}'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'"publishDate":"(.*?)"', html)
        if match:
            print(f'{vid}: {match.group(1)}')
        else:
            print(f'{vid}: Date not found')
    except Exception as e:
        print(f'{vid}: Error {e}')
