import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchX } from "lucide-react"

export default function PublicProfileNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-3xl shadow-xl text-center border border-slate-100">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
          <SearchX className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Profile Not Found</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          We couldn&apos;t find a Trust Card at this address. The profile may have been removed or the link might be broken.
        </p>
        <Link href="/">
          <Button size="lg" className="w-full h-12 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  )
}
