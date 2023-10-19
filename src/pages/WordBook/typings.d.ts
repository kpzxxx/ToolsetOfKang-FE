declare namespace WordBook {
  type Words = {
    words: [];
    date?: string;
    alpha?: string;
  };

  type Word = {
    id?: number;
    meaning?: string;
    word: string;
  };
}
