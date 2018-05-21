export interface Repository {  
  total_count: number;
  incomplete_results: boolean;
  items: RepositoryItem[];
}

export interface RepositoryItem {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  homepage: string;
  license: {name: string};
}

export interface Issue {
  total_count: number;
  incomplete_results: boolean;
  items: IssueItem[];
}

export interface IssueItem {
  id: number
  title: string;  
  created_at: string;
  updated_at: string;
  body: string;
}