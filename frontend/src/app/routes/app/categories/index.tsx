import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnFiltersState, PaginationState } from "@tanstack/react-table";

import {
  CategoriesTable,
  CategoriesHeader,
  categoriesSearchSchema,
  categoriesQueries,
} from "@/features/categories";

export const CategoriesPage = () => {
  const search = Route.useSearch();
  const deps = Route.useLoaderDeps();
  const navigate = Route.useNavigate();

  const categoriesQuery = useSuspenseQuery(
    categoriesQueries.list({
      pageNumber: deps.filters.pageNumber,
      pageSize: deps.filters.pageSize,
      name: deps.filters.name,
      kind: deps.filters.kind,
      status: deps.filters.status,
    }),
  );

  const handlePaginationChange = (pagination: PaginationState) => {
    navigate({
      search: {
        ...search,
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      },
      replace: true,
    });
  };

  const handleColumnFiltersChange = (updatedFilters: ColumnFiltersState) => {
    const nameFilter = updatedFilters.find((f) => f.id === "name");
    const kindFilter = updatedFilters.find((f) => f.id === "kind");
    const statusFilter = updatedFilters.find((f) => f.id === "status");

    const kindValue = Array.isArray(kindFilter?.value)
      ? kindFilter.value.join(",")
      : kindFilter?.value;

    const statusValue = Array.isArray(statusFilter?.value)
      ? statusFilter.value.join(",")
      : statusFilter?.value;

    navigate({
      search: {
        ...search,
        name: nameFilter?.value as string | undefined,
        kind: kindValue as string | undefined,
        status: statusValue as string | undefined,
      },
      replace: true,
    });
  };

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <CategoriesHeader />
      <CategoriesTable
        serverSide
        data={categoriesQuery.data.items}
        pageCount={categoriesQuery.data.totalPages}
        pagination={{
          pageIndex: deps.filters.pageNumber - 1,
          pageSize: deps.filters.pageSize,
        }}
        onPaginationChange={handlePaginationChange}
        columnFilters={[
          {
            id: "name",
            value: deps.filters.name,
          },
          {
            id: "kind",
            value: deps.filters.kind,
          },
          {
            id: "status",
            value: deps.filters.status,
          },
        ]}
        onColumnFiltersChange={handleColumnFiltersChange}
      />
    </main>
  );
};

export const Route = createFileRoute("/app/categories/")({
  validateSearch: categoriesSearchSchema,
  loaderDeps: ({ search }) => {
    return {
      filters: {
        pageNumber: search.pageNumber,
        pageSize: search.pageSize,
        name: search.name,
        kind: search.kind ? search.kind.split(",").filter(Boolean) : undefined,
        status: search.status ? search.status.split(",").filter(Boolean) : undefined,
      },
    };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      categoriesQueries.list({
        pageNumber: deps.filters.pageNumber,
        pageSize: deps.filters.pageSize,
        name: deps.filters.name,
        kind: deps.filters.kind,
        status: deps.filters.status,
      }),
    );
  },
  component: CategoriesPage,
});
