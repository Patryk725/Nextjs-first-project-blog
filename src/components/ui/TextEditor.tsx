"use client";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";
import { useState } from "react";

export function TextEditor({
  name,
  labelId,
  defaultValue = "",
}: {
  name: string;
  labelId: string;
  defaultValue?: string;
}) {
  const [html, setHtml] = useState(defaultValue);

  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue,
    immediatelyRender: false,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: {
      attributes: {
        "aria-labelledby": labelId,
        class:
          "prose dark:prose-invert max-w-none min-h-40 p-3 focus:outline-none bg-background text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-li:marker:text-foreground",
      },
    },
  });

  const active = useEditorState({
    editor,
    selector: ({ editor }) =>
      editor && {
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        h2: editor.isActive("heading", { level: 2 }),
        bullet: editor.isActive("bulletList"),
        ordered: editor.isActive("orderedList"),
      },
  });

  if (!editor) return null;

  const buttons = [
    {
      label: "B",
      on: active?.bold,
      run: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "I",
      on: active?.italic,
      run: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "H2",
      on: active?.h2,
      run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "• Lista",
      on: active?.bullet,
      run: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "1. Lista",
      on: active?.ordered,
      run: () => editor.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <div className="rounded-sm border">
      <div className="flex gap-1 border-b p-2">
        {buttons.map(b => (
          <button
            key={b.label}
            type="button"
            onClick={b.run}
            className={clsx("rounded-sm px-2", b.on && "font-bold underline")}
          >
            {b.label}
          </button>
        ))}
      </div>
      <EditorContent editor={editor} className="min-h-40 p-3" />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
