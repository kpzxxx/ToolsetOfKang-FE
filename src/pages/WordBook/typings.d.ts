declare namespace WordBook {
  type Words = {
    words: Word[];
    date?: string;
    alpha?: string;
  };

  type Word = {
    id?: number;
    meaning?: string;
    word: string;
  };

  type AddWord = {
    word: string;
    meaning?: string;
  };
}
