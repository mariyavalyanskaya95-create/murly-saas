export const metadata = { title: "My Story Book | Murly" };

export default function StoryPage() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#fdf1b8" }}>
      <iframe
        src="/games/funny-life-story.html"
        title="My Story Book"
        style={{ border: 0, width: "100%", height: "100%", display: "block" }}
        allow="fullscreen"
      />
    </div>
  );
}
