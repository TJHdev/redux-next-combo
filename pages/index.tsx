import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout title="Home">
      <div className="container mx-auto flex gap-5 max-w-xl px-4 text-gray-300">
        <p>click the Feed link above to see posts ↑</p>
      </div>
    </Layout>
  );
}
