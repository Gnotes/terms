import lunr from "lunr";

export interface ITermProps {
  belongTo: string;
  shortName: string;
  fullNameZH: string;
  fullNameEN: string;
  descriptions: string[];
}

interface ILunrProps {
  ref: string;
  score: number;
}

interface ITermWithIdProps extends ITermProps {
  index?: number;
}

interface DBProps {
  [index: string]: ITermProps[];
}

interface ResProps {
  code: number;
  data?: ITermProps[];
  message?: string;
}

export default class DB {
  private db: DBProps;
  private index: any;
  private terms?: ITermWithIdProps[];

  constructor(db: DBProps) {
    this.db = db;
  }

  init() {
    this.terms = Object.values(this.db)
      .reduce((pre, next) => pre.concat(next), [])
      .map((it: ITermWithIdProps, index) => {
        it.index = index;
        return it;
      });
    const self = this;
    self.index = lunr(function() {
      this.ref("index");
      this.field("shortName");
      this.field("fullNameEN");
      self.terms!.forEach((doc: ITermProps) => {
        this.add(doc);
      });
    });
  }

  getData(refs: ILunrProps[]) {
    const self = this;
    if (!self.terms) return [];
    const terms: ITermWithIdProps[] = [];
    refs.forEach((item: ILunrProps) => {
      const term = self.terms![parseInt(item.ref)];
      terms.push(term);
    });
    return terms;
  }

  search(keyword: string): ResProps {
    if (!keyword) {
      return {
        code: 0,
        message: "Keyword required",
      };
    }
    if (!this.index) this.init();
    const matchedTerms: ILunrProps[] = this.index.search(`*${keyword}*`);
    const data = this.getData(matchedTerms);
    return {
      code: 200,
      data: data,
    };
  }
}
