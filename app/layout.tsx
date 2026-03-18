import './globals.css'
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <body>{children}</body>
        </html>
    )
}