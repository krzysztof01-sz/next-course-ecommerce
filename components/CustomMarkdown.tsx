import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { MarkdownResult } from "../types";

interface CustomMarkdownProps {
  children: MarkdownResult;
}

export const CustomMarkdown = ({ children }: CustomMarkdownProps) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props}></a>;
          }

          const isUrlExternal =
            href.startsWith("http") || href.startsWith("//");

          return isUrlExternal ? (
            <a
              {...props}
              href={href}
              rel='noopener noreferrer'
              target='_blank'
            ></a>
          ) : (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
        p: ({ ...props }) => {
          return <p className='text-sm text-gray-400' {...props}></p>;
        },
        ul: ({ ...props }) => {
          return <ul className='text-sm text-gray-400' {...props}></ul>;
        },
      }}
    />
  );
};
