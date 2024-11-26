export default async function Event_detail({ params }) {
    const { slug } = await params;

    return (
      <>
        <p>{slug}</p>
        <p>Page is building ...</p>
      </>
    );
  }