export const Const = {
  API: {
    getRepo: "https://api.github.com/search/repositories",
    getIssues: "https://api.github.com/search/issues"
  },
  HEADERS: {
    json: { "Content-Type": "application/json" }
  },
  SEARCH_LIMIT: 10,
  DEFAULT_REPO: {
    total_count: 0,
    incomplete_results: false,
    items: []
  },
  DEFAULT_REPO_ITEM: {
    id: 0,
    name: "",
    full_name: "",
    html_url: "",
    description: "",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    language: "",
    homepage: "",
    license: { name: "" }
  },
  DEFAULT_ISSUE_ITEM: {
    total_count: 0,
    incomplete_results: false,
    items: [
      {
        id: 0,
        title: "",
        created_at: "",
        updated_at: "",
        body: ""
      }
    ]
  }
};
