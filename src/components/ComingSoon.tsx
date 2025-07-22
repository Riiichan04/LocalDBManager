import '@/styles/comingSoonBackground.css'

export default function ComingSoon() {
    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <div className='absolute w-full h-full'>
                <div className='bg-top-right'>
                    <div className="w-15 h-30 bg-element-circle-main rounded-r-full top-20 left-0"></div>
                    <div className="w-15 h-15 bg-element-circle-sub rounded-full top-42 left-20"></div>
                    <div className="w-15 h-15 bg-element-circle-small-sub rounded-tr-full top-25 left-20"></div>
                    <div className="w-15 h-35 bg-element-circle-sub rounded-full -top-20 -left-5"></div>
                    <div className="w-30 h-30 rounded-full bg-element-circle-main -top-15 left-20"></div>
                    <div className="w-20 h-10 bg-element-circle-small-main rounded-t-full top-18 left-35 rotate-150"></div>
                    <div className="w-30 h-15 bg-element-circle-small-sub rounded-t-full top-12 left-55"></div>
                    <div className="w-15 h-15 bg-element-circle-small-main rounded-full -top-5 left-57"></div>
                    <div className="w-10 h-10 bg-element-circle-main rounded-tl-full top-0 left-75"></div>
                    <div className="w-18 h-18 bg-element-circle-small-main rounded-br-full -top-5 left-88"></div>
                </div>
                <div className='bg-top-right'>
                    <div className="w-30 h-30 rounded-full bg-element-circle-sub -top-20 right-15"></div>
                    <div className="w-30 h-30 rounded-full bg-element-circle-small-main top-5 -right-15"></div>
                    <div className="w-15 h-15 bg-element-circle-small-sub rounded-tr-full top-12 right-20"></div>
                    <div className="w-8 h-8 bg-element-circle-main rounded-bl-full top-30 right-20"></div>
                    <div className="w-50 h-15 rounded-full bg-element-circle-sub top-38 -right-35"></div>
                </div>
                <div className='bg-bottom-right'>
                    <div className="w-15 h-30 bg-element-circle-main rounded-r-full bottom-30 right-2"></div>
                    <div className="w-15 h-15 bg-element-circle-sub rounded-full bottom-42 right-20"></div>
                    <div className="w-15 h-15 bg-element-circle-small-sub rounded-bl-full bottom-25 right-20"></div>
                    <div className="w-15 h-35 bg-element-circle-small-main rounded-full -bottom-10 right-1"></div>
                    <div className="w-30 h-30 rounded-full bg-element-circle-main -bottom-15 right-20"></div>
                    <div className="w-20 h-10 bg-element-circle-small-main rounded-b-full bottom-18 right-35 rotate-150"></div>
                    <div className="w-30 h-15 bg-element-circle-small-sub rounded-t-full bottom-12 right-55"></div>
                    <div className="w-15 h-15 bg-element-circle-sub rounded-full -bottom-5 right-57"></div>
                    <div className="w-10 h-10 bg-element-circle-main rounded-bl-full bottom-0 right-75"></div>
                    <div className="w-15 h-15 bg-element-circle-small-main rounded-br-full bottom-2 right-88"></div>
                </div>
                <div className='bg-bottom-left'>
                    <div className="w-30 h-30 rounded-full bg-element-circle-sub -bottom-20 left-15"></div>
                    <div className="w-30 h-30 rounded-full bg-element-circle-small-main bottom-5 -left-15"></div>
                    <div className="w-15 h-15 bg-element-circle-small-sub rounded-tr-full bottom-12 left-20"></div>
                    <div className="w-8 h-8 bg-element-circle-main rounded-bl-full bottom-28 left-20"></div>
                    <div className="w-50 h-15 rounded-full bg-element-circle-sub bottom-38 -left-35"></div>
                    <div className="w-15 h-15 bg-element-circle-sub rounded-full -bottom-5 left-50"></div>
                </div>
            </div>
            <div className="text-center z-10">
                <p className="font-light mb-5 md:text-6xl text-4xl">COMING SOON</p>
                <p className='text-gray-60'>Có một thứ gì đó sắp xuất hiện. Hãy chờ nhé!!!</p>
            </div>
        </div>
    )
}