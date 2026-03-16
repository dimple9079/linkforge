export function copyToClipboard(text) {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback: Copy failed", err);
    }
    document.body.removeChild(textarea);
  } else {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Copy failed", err);
    });
  }
}

export function downloadFile(filename, content) {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for Firefox
  element.click();
  document.body.removeChild(element);
}

export async function shareData({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch (err) {
      console.error("Share failed", err);
    }
  } else {
    alert("Share not supported on this browser");
  }
}