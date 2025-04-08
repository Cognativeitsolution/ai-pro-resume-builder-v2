interface Cards {
  id: number;
  components: {
    id: number;
    name: string;
    height?: string;
    width?: string;
    locked?: boolean | string
  }[];
}

export const cardsData: Cards[] = [
  {
    id: 0,
    components: [
      { id: 101, name: "Summary", locked: true },
      { id: 102, name: "Experience", height: "h-[90px]" },
      { id: 103, name: "Education", height: "h-[90px]" },
      { id: 104, name: "Language" },
    ],
  },
  {
    id: 1,
    components: [
      { id: 201, name: "Skills" },
      { id: 202, name: "Key Achievements" },
      { id: 203, name: "Certificate" },
      { id: 204, name: "Projects" },
      { id: 205, name: "Interest" },
    ],
  },
]


