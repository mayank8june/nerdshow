import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace opening <div class="season-row">
wrapper_open = '''        <div class="season-wrapper">
            <button class="nav-btn prev-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div class="season-row">'''
html = html.replace('        <div class="season-row">', wrapper_open)

# Replace the closing div for Season 2
season_1_title = '        <h2 class="season-title">Season 1</h2>'
wrapper_close_1 = '''            </div>
            <button class="nav-btn next-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        </div>

        <h2 class="season-title">Season 1</h2>'''
html = html.replace('        </div>\n\n        <h2 class="season-title">Season 1</h2>', wrapper_close_1)

# Replace the closing div for Season 1
main_close = '    </main>'
wrapper_close_2 = '''            </div>
            <button class="nav-btn next-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        </div>
    </main>'''
html = html.replace('        </div>\n    </main>', wrapper_close_2)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
