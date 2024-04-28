// app/about/page.tsx
import Layout from "@/components/Layout";
import Image from "next/image";
import { Suspense } from "react";

export default async function LicensePage() {
  //   const post = await getPost("license", "license");

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="border p-4 m-4 shadow rounded">
          <h1 className="text-xl font-bold mb-4 dark:text-white">
            ◉ 모델 설계도 커스텀 라이센스
          </h1>

          <p className="dark:text-white">
            이 저작물은
            <a href="https://creativecommons.org/licenses/by-nc/4.0/legalcode ">
              크리에이티브 커먼즈 저작자표시-비영리 4.0 국제 라이선스
            </a>
            와 아래 추가 조건에 따라 이용할 수 있습니다.
          </p>

          <h2 className="text-lg font-semibold mt-6 dark:text-white">
            ► 추가 조건
          </h2>
          <ol className="dark:text-white">
            <li>
              이 저작물에 포함된 개별 모델은 상업적 제품에도 자유롭게 사용,
              수정, 배포할 수 있습니다.
            </li>
            <li>
              이 라이선스를 준수하여 저작물을 이용하거나 배포할 경우,
              저작자표시를 포함해야 합니다.
            </li>
            <br />
            <li>
              그러나 이 저작물의 전체 설계와 전체 코드는 비영리적인 목적으로만
              이용 가능하며, 상업적 판매나 재배포는 허용되지 않습니다.
            </li>
            <li>
              이 저작물을 이용하여 새로운 저작물을 작성할 경우, 해당 저작물은
              동일한 라이선스를 따라야 합니다.
            </li>
          </ol>

          <h2 className="text-lg font-semibold mt-6 dark:text-white">
            ► 저작권 안내
          </h2>

          <p className="dark:text-white">
            &copy; 2024 Django Model Gallery. All rights reserved.
          </p>

          <div className="flex justify-center items-center space-x-2 mt-4 p-4 border">
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              className="flex"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/license/by.svg`}
                alt="크리에이티브 커먼즈 라이선스"
                width={50}
                height={50}
              />
            </a>
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              className="flex"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/license/cc.svg`}
                alt="크리에이티브 커먼즈 라이선스"
                width={50}
                height={50}
              />
            </a>
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              className="flex"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/license/nc.svg`}
                alt="크리에이티브 커먼즈 라이선스"
                width={50}
                height={50}
              />
            </a>
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}
