#!/usr/bin/env python3
"""Run a local static preview without browser-cached assets."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8001), NoCacheHandler)
    print("Preview available at http://127.0.0.1:8001 (asset caching disabled)")
    server.serve_forever()
