"use client";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { Descendant, Transforms } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
} from "slate-react";

import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import {
  MdAddPhotoAlternate,
  MdFormatUnderlined,
  MdOutlineAddLink,
  MdOutlineFormatBold,
  MdOutlineFormatItalic,
} from "react-icons/md";
import { createEditor } from "slate";
import {
  SlateBlockImage,
  SlateCustomEditor,
  SlateCustomElement,
  SlateLeaf,
} from "@/common.type";
import Link from "next/link";
import Image from "next/image";
import SlateMarkButton from "./SlateMarkButton";
import SlateBlockButton from "./SlateBlockButton";

import SlateHeaderDropDown from "./SlateHeaderDropDown";
// import SlateImage from "./SlateImage";
import SlateImageBlock from "./SlateImageBlock";
import Model, { ModelHandle } from "./Model";
import { Tab } from "@headlessui/react";
import { classNames } from "@/util";
import { BsUpload } from "react-icons/bs";

declare module "slate" {
  interface CustomTypes {
    Editor: SlateCustomEditor;
    Element: SlateCustomElement;
    Text: SlateLeaf;
  }
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case "header-one":
      return (
        <h1
          className="block text-center text-2xl font-medium mb-6 text-blue-400"
          {...attributes}
        >
          {children}
        </h1>
      );
    case "header-two":
      return (
        <h2 className="text-xl text-red-500 font-bold mb-3" {...attributes}>
          {children}
        </h2>
      );
    case "header-three":
      return (
        <h3 className="text-lg text-blue-400 font-bold mb-3" {...attributes}>
          {children}
        </h3>
      );
    case "header-four":
      return <h4 {...attributes}>{children}</h4>;
    case "header-five":
      return <h5 {...attributes}>{children}</h5>;
    case "header-six":
      return <h6 {...attributes}>{children}</h6>;
    case "bulleted-list":
      return (
        <ul
          className="text-base font-light text-black-100 mb-3 list-disc ml-5 space-y-2"
          {...attributes}
        >
          {children}
        </ul>
      );
    case "numbered-list":
      return (
        <ol
          className="text-base font-light text-black-100 mb-3 list-decimal ml-5 space-y-2"
          {...attributes}
        >
          {children}
        </ol>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;

    case "image":
      return (
        <SlateImageBlock
          attributes={attributes}
          element={element}
          children={children}
        />
      );
    default:
      return (
        <p
          className="text-base font-light text-black-100 mb-3 "
          {...attributes}
        >
          {children}
        </p>
      );
  }
};

const Leaf = ({ leaf, attributes, children }: RenderLeafProps) => {
  const cov = [leaf.bold, leaf.italic, leaf.underline, leaf.url];
  const css = [
    "font-bold",
    "italic",
    "underline",
    "underline text-blue-500 cursor-pointer",
  ]
    .filter((_, i) => cov[i])
    .join(" ")
    .split(" ")
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(" ");
  if (leaf.url)
    return (
      <Link prefetch={false} href={leaf.url} {...attributes} className={css}>
        {children}
      </Link>
    );
  return (
    <span {...attributes} className={css}>
      {children}
    </span>
  );
};

type Props = {
  init: Descendant[];
  editor: SlateCustomEditor;
  onChange?: (value: Descendant[]) => void;
  readOnly?: boolean;
};

const SlateImage = () => {
  const editor = useSlate();
  const refTest = useRef<ModelHandle>(null);
  const [data, setData] = useState<{ caption: string; image: string }>({
    caption: "",
    image: "",
  });

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      alert("Please upload an image!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      setData((prev) => ({ ...prev, image: result }));
    };
  };
  const handleAdd = () => {
    const text = { text: "" };
    const image: SlateBlockImage = {
      type: "image",
      url: data.image,
      caption: data.caption,
      children: [text],
    };
    Transforms.insertNodes(editor, image);
    refTest.current?.setIsHidden(true);
    setData({
      caption: "",
      image: "",
    });
  };
  return (
    <>
      <button
        type="button"
        onClick={() => {
          refTest.current?.setIsHidden(false);
        }}
        className={`p-2 rounded-full cursor-pointer ${
          false
            ? "hover:bg-sky-100 text-sky-500"
            : "hover:bg-gray-100 text-gray-500"
        }`}
      >
        <MdAddPhotoAlternate size={24} />
      </button>
      <Model ref={refTest}>
        <div className="flex flex-col space-y-2">
          <p className="text-base font-medium mb-2">Thêm ảnh</p>
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-[#ecf2ff] p-1">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#5d87ff] outline-none",
                    selected
                      ? "bg-white shadow"
                      : "hover:bg-indigo-200 hover:text-white"
                  )
                }
              >
                Tập tin cục bộ
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#5d87ff] outline-none",
                    selected
                      ? "bg-white shadow"
                      : "hover:bg-indigo-200 hover:text-white"
                  )
                }
              >
                Trung tâm phương tiện
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <label
                  htmlFor="slate-image"
                  className="flex flex-col items-center justify-center text-gray-400 py-2 cursor-pointer w-[550px] h-[300px] rounded border-dashed border-[2px] border-gray-300"
                >
                  {!data.image && (
                    <>
                      <BsUpload size={36} />
                      <p className="font-medium text-sm">Tải ảnh lên</p>
                    </>
                  )}

                  <input
                    type="file"
                    id="slate-image"
                    name="slate-image"
                    accept="image/*"
                    className="hidden"
                    onChange={onchange}
                  />
                  {data.image && (
                    <div className="relative object-contain w-[300px] h-[300px]">
                      <Image fill src={data.image} alt="Thumnail" />
                    </div>
                  )}
                </label>
              </Tab.Panel>
              <Tab.Panel>
                <div className="grid grid-flow-row gap-2 grid-cols-5 overflow-y-scroll w-[550px] h-[300px] p-2 border rounded-md">
                  <label
                    htmlFor="thumbnail"
                    className="flex flex-col items-center justify-center text-gray-400 py-2 cursor-pointer w-[100px] h-[100px] rounded border-dashed border-[2px] border-gray-300 mb-4"
                  >
                    <BsUpload size={24} />
                    <p className="text-center font-medium text-sm">
                      Tải ảnh lên
                    </p>

                    <input
                      type="file"
                      id="thumbnail"
                      name="image"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  <div
                    onClick={() => {
                      if (
                        data.image === "https://source.unsplash.com/kFrdX5IeQzI"
                      ) {
                        setData({
                          ...data,
                          image: "",
                        });
                      } else {
                        setData({
                          ...data,
                          image: "https://source.unsplash.com/kFrdX5IeQzI",
                        });
                      }
                    }}
                    className="relative group"
                  >
                    <div className="relative h-[100px] w-full rounded overflow-hidden">
                      <Image
                        alt="image"
                        src="https://source.unsplash.com/kFrdX5IeQzI"
                        fill
                        sizes="100"
                      />
                    </div>
                    <p>image name</p>
                    <input
                      checked={
                        data.image === "https://source.unsplash.com/kFrdX5IeQzI"
                      }
                      className={`${
                        data.image === "https://source.unsplash.com/kFrdX5IeQzI"
                          ? ""
                          : "hidden group-hover:block"
                      } absolute top-0 left-0 mt-2 ml-2`}
                      type="checkbox"
                    />
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <input
            value={data.caption}
            onChange={(e) => setData({ ...data, caption: e.target.value })}
            className="rounded-md border p-2"
            required
            type="text"
            placeholder="Tiêu đề"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                refTest.current?.setIsHidden(true);
              }}
              type="button"
              className="px-3 py-2 bg-red-500 rounded hover:bg-red-600 text-white disabled:bg-red-600/60"
            >
              Huỷ
            </button>
            {data.caption.length > 0 && data.image.length > 0 ? (
              <button
                onClick={handleAdd}
                type="button"
                className="px-3 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 disabled:bg-blue-600/60"
              >
                Thêm
              </button>
            ) : (
              <p className="px-3 py-2 bg-blue-500 rounded text-white bg-blue-600/60">
                Thêm
              </p>
            )}
          </div>
        </div>
      </Model>
    </>
  );
};

const RichTextEditor = ({ init, readOnly, onChange, editor }: Props) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={init} onChange={onChange}>
      <div className="rounded-xl shadow-lg overflow-hidden p-4 mt-2 mb-4">
        <div className="flex items-center space-x-2 flex-wrap">
          <SlateHeaderDropDown />
          <SlateMarkButton
            format="bold"
            icon={<MdOutlineFormatBold size={24} />}
          />
          <SlateMarkButton
            format="italic"
            icon={<MdOutlineFormatItalic size={24} />}
          />
          <SlateMarkButton
            format="underline"
            icon={<MdFormatUnderlined size={24} />}
          />
          <SlateBlockButton
            format="numbered-list"
            icon={<AiOutlineOrderedList size={24} />}
          />
          <SlateBlockButton
            format="bulleted-list"
            icon={<AiOutlineUnorderedList size={24} />}
          />
          <SlateMarkButton format="url" icon={<MdOutlineAddLink size={24} />} />
          {/* <SlateImage /> */}

          <SlateImage />
        </div>

        <Editable
          className="border mt-4 h-[500px] overflow-scroll rounded-xl p-2"
          readOnly={readOnly}
          spellCheck={false}
          onKeyDown={(event) => {
            // console.log(event.key);
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </div>
    </Slate>
  );
};

export default RichTextEditor;
