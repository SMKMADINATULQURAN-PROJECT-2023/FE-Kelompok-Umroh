"use client";

import { useState, useEffect } from "react";

interface PaginationHookOptions {
  page: number;
  pageSize: number;
  paginationTotal: number;
}

interface PaginationHookResult {
  totalPages: number;
  isCanPrevious: boolean;
  isCanNext: boolean;
}

const usePagination = ({
  page,
  pageSize,
  paginationTotal,
}: PaginationHookOptions): PaginationHookResult => {
  const [isCanPrevious, setIsCanPrevious] = useState(true);
  const [isCanNext, setIsCanNext] = useState(true);

  const totalPages = paginationTotal ? Math.ceil(paginationTotal / pageSize) : 1;

  const isCanPreviousPage = () => {
    if (page > 1) {
      setIsCanPrevious(false);
    } else {
      setIsCanPrevious(true);
    }
  };

  const isCanNextPage = () => {
    if (page >= totalPages) {
      setIsCanNext(true);
    } else {
      setIsCanNext(false);
    }
  };

  useEffect(() => {
    isCanPreviousPage();
    isCanNextPage();
  }, [page, totalPages]);

  return {
    totalPages,
    isCanPrevious,
    isCanNext,
  };
};

export default usePagination;
