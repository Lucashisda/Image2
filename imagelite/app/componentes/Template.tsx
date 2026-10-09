interface TemplateProps {
    children: React.ReactNode
}

export const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Header />
            <main className="mx-auto max-w-7xl px-4 pb-16 pt-6">
                {children}
            </main>
            <Footer />
        </div>
    )
}

const Header: React.FC = () => {
    return (
        <header className="border-b border-slate-800 bg-slate-950/90 text-white backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-lg font-bold shadow-lg shadow-blue-500/30">
                        I
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">ImageLite</h1>
                </div>
            </div>
        </header>
    )
}

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
            <div className="mx-auto max-w-7xl px-4 py-4 text-center text-sm">
                Desenvolvido por Lucão.
            </div>
        </footer>
    )
}