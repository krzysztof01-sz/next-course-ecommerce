/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "fragment FullProduct on Product {\n  id\n  title\n  slug\n  description\n  longDescription\n  rating\n  price\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}": types.FullProductFragmentDoc,
    "fragment LightProduct on Product {\n  id\n  title\n  slug\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}": types.LightProductFragmentDoc,
    "query GetAllProducts {\n  products {\n    ...LightProduct\n  }\n}": types.GetAllProductsDocument,
    "query GetAllProductsSlug {\n  products {\n    slug\n  }\n}": types.GetAllProductsSlugDocument,
    "query GetHomepageProducts {\n  products(first: 2) {\n    id\n    title\n    slug\n    rating\n    description\n    image {\n      id\n      width\n      height\n      url(transformation: {image: {resize: {width: 800, height: 400}}})\n    }\n  }\n}": types.GetHomepageProductsDocument,
    "query GetProductDetails($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...FullProduct\n  }\n}": types.GetProductDetailsDocument,
};

export function graphql(source: "fragment FullProduct on Product {\n  id\n  title\n  slug\n  description\n  longDescription\n  rating\n  price\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}"): (typeof documents)["fragment FullProduct on Product {\n  id\n  title\n  slug\n  description\n  longDescription\n  rating\n  price\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}"];
export function graphql(source: "fragment LightProduct on Product {\n  id\n  title\n  slug\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}"): (typeof documents)["fragment LightProduct on Product {\n  id\n  title\n  slug\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}"];
export function graphql(source: "query GetAllProducts {\n  products {\n    ...LightProduct\n  }\n}"): (typeof documents)["query GetAllProducts {\n  products {\n    ...LightProduct\n  }\n}"];
export function graphql(source: "query GetAllProductsSlug {\n  products {\n    slug\n  }\n}"): (typeof documents)["query GetAllProductsSlug {\n  products {\n    slug\n  }\n}"];
export function graphql(source: "query GetHomepageProducts {\n  products(first: 2) {\n    id\n    title\n    slug\n    rating\n    description\n    image {\n      id\n      width\n      height\n      url(transformation: {image: {resize: {width: 800, height: 400}}})\n    }\n  }\n}"): (typeof documents)["query GetHomepageProducts {\n  products(first: 2) {\n    id\n    title\n    slug\n    rating\n    description\n    image {\n      id\n      width\n      height\n      url(transformation: {image: {resize: {width: 800, height: 400}}})\n    }\n  }\n}"];
export function graphql(source: "query GetProductDetails($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...FullProduct\n  }\n}"): (typeof documents)["query GetProductDetails($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...FullProduct\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;