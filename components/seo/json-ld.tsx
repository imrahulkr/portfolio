// Renders one schema.org JSON-LD block. Escaping "<" keeps any text that
// ends up in the data (titles, descriptions) from closing the script tag.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
