export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($country: CountryCode!, $language: LanguageCode!) @inContext(country: $country, language: $language) {
    products(first: 12, sortKey: BEST_SELLING) {
      nodes {
        id
        handle
        title
        description
        tags
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = /* GraphQL */ `
  query Product($handle: String!, $country: CountryCode!, $language: LanguageCode!) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      handle
      title
      description
      tags
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 1) {
        nodes {
          id
        }
      }
    }
  }
`;
