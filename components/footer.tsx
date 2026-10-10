import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#dfe7df] bg-[#eef5ef]">
      <div className="container-main py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-lg font-black text-[#1c281c]"
            >
              বাজার দর
            </Link>

            <p className="mt-1 text-sm text-[#697269]">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          <p className="max-w-md text-left text-xs leading-6 text-[#737b73] sm:text-right">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
            পরিবর্তিত হয়।”
          </p>
        </div>

        <div className="mt-6 border-t border-[#dce5dc] pt-5 text-center text-xs text-[#899089]">
          © {new Date().getFullYear()} বাজার দর — BazarDor
        </div>
      </div>
    </footer>
  );
}