import type { Metadata } from "next";
import Link from "next/link";

import { deleteEntityAction, saveProductSettingsAction, upsertEntityAction } from "@/admin/actions/admin-actions";
import { FormActions, FormGrid } from "@/components/admin/admin-form-helpers";
import { ProductEntryRichEditor, ProductSettingsRichEditor } from "@/components/admin/product-rich-editors";
import {
  AdminDirectoryList,
  AdminManagerLayout,
  AdminMetricCard,
  AdminRecordLink,
  AdminSectionCard,
  AdminShell,
  StatusNotice,
  getAdminFlashMessage,
} from "@/components/admin/admin-ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { getAdminProducts, getProductSettings } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Products",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
    edit?: string;
  }>;
};

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const [items, settings] = await Promise.all([getAdminProducts(), getProductSettings()]);
  const selectedItem = items.find((item) => item._id === params.edit) ?? null;
  const saveProductAction = upsertEntityAction.bind(null, "product", "/admin/products");
  const deleteProductAction = deleteEntityAction.bind(null, "product", "/admin/products");

  return (
    <AdminShell
      activePath="/admin/products"
      title="Products manager"
      description="Manage the product dropdown, mobile menu entries, individual product heroes, and the shared public products sections from MongoDB."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <section className="grid gap-6 md:grid-cols-3">
        <AdminMetricCard
          label="Products"
          value={String(items.length)}
          description="All product pages currently stored in MongoDB."
        />
        <AdminMetricCard
          label="Published"
          value={String(items.filter((item) => item.isPublished).length)}
          description="Visible products shown in the navbar and public product routes."
        />
        <AdminMetricCard
          label="Navbar entries"
          value={String(items.filter((item) => item.isPublished).length)}
          description="Published products are automatically used in both desktop and mobile navigation."
        />
      </section>

      <AdminSectionCard
        title="Shared product sections"
        description="These settings control the /products landing page, the products navbar dropdown, and the common sections reused across all product detail pages."
      >
        <form action={saveProductSettingsAction} className="grid gap-5">
          <ProductSettingsRichEditor values={settings} />
          <FormActions>
            <SubmitButton label="Save shared product sections" pendingLabel="Saving..." />
          </FormActions>
        </form>
      </AdminSectionCard>

      <AdminManagerLayout
        sidebar={
          <AdminSectionCard
            title="Product directory"
            description="Manage the individual product hero entries that power the navbar and each /products/[slug] route."
          >
            <AdminDirectoryList>
              <AdminRecordLink
                href="/admin/products"
                active={!selectedItem}
                title="Create new product"
                subtitle="Open a blank product hero form"
                meta="Blank form"
                leading="+"
              />
              {items.map((item) => (
                <AdminRecordLink
                  key={item._id}
                  href={`/admin/products?edit=${item._id}`}
                  active={selectedItem?._id === item._id}
                  title={item.navLabel}
                  subtitle={item.heroTitle}
                  meta={item.slug}
                  leading={String(item.order ?? 0)}
                  trailing={
                    <span className="rounded-full border border-white/10 bg-black/5 dark:bg-black/5 dark:bg-white/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                      {item.isPublished ? "Live" : "Draft"}
                    </span>
                  }
                />
              ))}
            </AdminDirectoryList>
          </AdminSectionCard>
        }
        editor={
          <AdminSectionCard
            title={selectedItem ? `Edit ${selectedItem.navLabel}` : "Create product"}
            description={
              selectedItem
                ? "Update one product at a time, including the navbar label, hero copy, and CTA button."
                : "Add a new product entry for the navbar and public product route."
            }
          >
            <form action={saveProductAction} className="grid gap-5">
              {selectedItem ? <input type="hidden" name="id" value={selectedItem._id} /> : null}
              <FormGrid>
                <ProductEntryRichEditor values={selectedItem ?? { order: items.length + 1, isPublished: true }} />
              </FormGrid>
              <FormActions>
                <SubmitButton label={selectedItem ? "Save product" : "Create product"} pendingLabel={selectedItem ? "Saving..." : "Creating..."} />
                {selectedItem ? (
                  <Link
                    href="/admin/products"
                    scroll={false}
                    className="inline-flex items-center rounded-full border border-white/12 bg-black/5 dark:bg-black/5 dark:bg-white/6 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-black/5 dark:bg-black/5 dark:bg-white/10"
                  >
                    Create another
                  </Link>
                ) : null}
              </FormActions>
            </form>

            {selectedItem ? (
              <form action={deleteProductAction} className="mt-4">
                <input type="hidden" name="id" value={selectedItem._id} />
                <SubmitButton label="Delete product" pendingLabel="Deleting..." variant="danger" />
              </form>
            ) : null}
          </AdminSectionCard>
        }
      />
    </AdminShell>
  );
}
