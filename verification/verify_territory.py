from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5174")

        # Wait for the territory info to appear (it should be visible initially due to our hack)
        # We look for "Territory Details" header
        page.wait_for_selector("text=Territory Details", timeout=10000)

        # Check if Owner info is visible
        owner_text = page.get_by_text("Owner: Player 1")
        expect(owner_text).to_be_visible()

        # Check if the button says "Territory Claimed"
        button = page.get_by_role("button", name="Territory claimed by Player 1")
        expect(button).to_be_visible()
        expect(button).to_be_disabled()

        # Take a screenshot
        page.screenshot(path="verification/territory_info.png")

        browser.close()

if __name__ == "__main__":
    run()
