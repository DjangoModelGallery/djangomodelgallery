"use client";

import FakeSelect from "@/common/FakeSelect";
import { Option } from "@/types/search/select";
import { formatQuery } from "@/utils/formatQuery";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MultiValue } from "react-select";

/**
 * SearchSelect 컴포넌트를 클라이언트 측에서만 렌더링하기 위해 동적으로 가져옵니다.
 */
const SearchSelect = dynamic(() => import("@/common/SearchSelect"), {
  ssr: false,
  loading: () => <FakeSelect />,
});

interface SearchFormProps {
  sortOptions: Option[];
  categoryOptions: Option[];
  tagOptions: Option[];
}
/**
 * `SearchForm` 컴포넌트는 검색 폼을 렌더링합니다.
 * 이 컴포넌트는 정렬, 카테고리, 태그 옵션을 선택하고 검색 쿼리를 입력할 수 있습니다.
 * 선택한 옵션과 검색 쿼리는 URL의 검색 매개변수로 설정되며, 이는 페이지를 새로 고침하거나 다시 방문할 때 선택한 옵션과 검색 쿼리를 유지합니다.
 *
 * @param {Option[]} sortOptions - 정렬 옵션 목록
 * @param {Option[]} categoryOptions - 카테고리 옵션 목록
 * @param {Option[]} tagOptions - 태그 옵션 목록
 */
export default function SearchForm({
  sortOptions,
  categoryOptions,
  tagOptions,
}: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState({
    sort: [] as MultiValue<Option>,
    category: [] as MultiValue<Option>,
    tag: [] as MultiValue<Option>,
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    const sortParams =
      searchParams
        .get("sort")
        ?.split(",")
        .map((t) => formatQuery(t.trim())) || [];
    const categoryParams =
      searchParams
        .get("category")
        ?.split(",")
        .map((t) => formatQuery(t.trim())) || [];
    const tagParams =
      searchParams
        .get("tag")
        ?.split(",")
        .map((t) => formatQuery(t.trim())) || [];
    const queryParams = formatQuery(searchParams.get("query")?.trim() || "");

    const mapParamsToOptions = (params: string[], options: Option[]) => {
      return params
        .map((param) =>
          options.find((option) => formatQuery(option.value) === param)
        )
        .filter(Boolean) as MultiValue<Option>;
    };

    setSelectedOptions({
      sort: mapParamsToOptions(sortParams, sortOptions),
      category: mapParamsToOptions(categoryParams, categoryOptions),
      tag: mapParamsToOptions(tagParams, tagOptions),
    });

    setQuery(queryParams);
  }, [searchParams, sortOptions, categoryOptions, tagOptions]);

  const handleChange =
    (field: keyof typeof selectedOptions) => (value: MultiValue<Option>) => {
      const newSelectedOptions = { ...selectedOptions, [field]: value };
      const newSearchParams = new URLSearchParams();

      Object.entries(newSelectedOptions).forEach(([key, value]) => {
        const formattedValues = value.map((option) =>
          formatQuery(option.value)
        );
        if (formattedValues.length > 0) {
          newSearchParams.set(key, formattedValues.join(","));
        }
      });

      if (query) {
        newSearchParams.set("query", formatQuery(query));
      }

      router.push(`?${newSearchParams.toString()}`);
    };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("query", formatQuery(query));
    router.push(`?${newSearchParams.toString()}`, undefined);
  };

  const handleReset = () => {
    setSelectedOptions({ sort: [], category: [], tag: [] });
    setQuery("");
    router.push("/posts");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <SearchSelect
          options={sortOptions}
          onChange={handleChange("sort")}
          placeholder="Sort by..."
          value={selectedOptions.sort}
        />
        <SearchSelect
          options={categoryOptions}
          onChange={handleChange("category")}
          placeholder="Select categories..."
          value={selectedOptions.category}
        />
        <SearchSelect
          options={tagOptions}
          onChange={handleChange("tag")}
          placeholder="Select tags..."
          value={selectedOptions.tag}
        />
      </div>
      <div className="flex space-x-4">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
