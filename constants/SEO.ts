import { Post } from "@/types/posts/posts";

export const LOOT_LAYOUT_METADATA = {
  title: {
    template: "%s | DMG",
    default: "DMG | All Models can be founded here.",
  },
  description: "DMG, All Models can be founded here.",
  openGraph: {
    title: "DMG",
    description: "DMG, All Models can be founded here.",
    url: "",
    siteName: "DMG",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "DMG",
      },
    ],
  },
  icons: {
    shortcut: "",
  },
};

export const LOOT_CONTRIBUTE_METADATA = {
  title: `Guide | Contribute to DMG`,
  description: "DMG, All Models can be founded here.",
  openGraph: {
    title: "Contribute",
    description: "DMG, All Models can be founded here.",
    siteName: "DMG",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "DMG",
      },
    ],
  },
  icons: {
    shortcut: "",
  },
};

export const LOOT_ABOUT_METADATA = {
  title: `About | About us`,
  description: "DMG, All Models can be founded here.",
  openGraph: {
    title: "About",
    description: "DMG, All Models can be founded here.",
    siteName: "DMG",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "DMG",
      },
    ],
  },
  icons: {
    shortcut: "",
  },
};

export const LOOT_POSTS_METADATA = {
  title: `Posts | DMG Posts`,
  description: "DMG, All Models can be founded here.",
  openGraph: {
    title: "Posts",
    description: "DMG, All Models can be founded here.",
    siteName: "DMG",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "DMG",
      },
    ],
  },
  icons: {
    shortcut: "",
  },
};

export const LOOT_CONTRIBUTE_DETAIL_METADATA = (postDetail: Post | null) => {
  return {
    title: postDetail?.title,
    description: `${postDetail?.frontmatter.title} | Django Model Gallery.`,
    openGraph: {
      title: postDetail?.title,
      description: `${postDetail?.frontmatter.title} | Django Model Gallery.`,
      type: "website",
    },
  };
};

export const LOOT_POST_DETAIL_METADATA = (postDetail: Post | null) => {
  return {
    title: postDetail?.title,
    description: `${postDetail?.frontmatter.category} | Django Model Gallery.`,
    openGraph: {
      title: postDetail?.title,
      description: `${postDetail?.frontmatter.category} | Django Model Gallery.`,
      type: "website",
    },
  };
};
