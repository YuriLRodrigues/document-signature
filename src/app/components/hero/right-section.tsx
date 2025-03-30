import { FileText } from 'lucide-react'

export const RightHeroSection = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-30 w-24 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg md:h-60 md:w-48">
        <div className="absolute top-0 right-0 h-8 w-8 bg-gray-100 md:h-16 md:w-16">
          <div
            className="absolute bottom-0 left-0 h-8 w-8 bg-white md:h-16 md:w-16"
            style={{
              borderTopRightRadius: '0.5rem',
              clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
            }}
          ></div>
        </div>

        <div className="absolute top-8 right-6 left-6 space-y-3">
          <div className="h-1.5 w-3/4 rounded-full bg-blue-200 md:h-3"></div>
          <div className="h-1.5 rounded-full bg-blue-100 md:h-3"></div>
          <div className="h-1.5 w-5/6 rounded-full bg-blue-100 md:h-3"></div>
          <div className="h-1.5 w-4/6 rounded-full bg-blue-100 md:h-3"></div>
          <div className="h-1.5 w-3/4 rounded-full bg-blue-200 md:h-3"></div>
          <div className="h-1.5 rounded-full bg-blue-100 md:h-3"></div>
          <div className="h-1.5 w-5/6 rounded-full bg-blue-100 md:h-3"></div>
          <div className="h-1.5 w-4/6 rounded-full bg-blue-100 md:h-3"></div>
        </div>

        <div className="absolute right-6 bottom-6 text-blue-500">
          <FileText className="size-8 md:size-16" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}
