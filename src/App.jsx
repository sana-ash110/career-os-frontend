import { useState, useEffect, useCallback, useRef } from "react";

// ============================================================
// DATA LAYER — Roadmap, Projects, Skills
// ============================================================

const ROADMAP = [
  {
    id: "foundation",
    phase: 1,
    title: "Foundation",
    subtitle: "Python · DSA · SQL · Linux · Git",
    color: "#6EE7B7",
    accent: "#064E3B",
    icon: "⬡",
    durationWeeks: 12,
    topics: [
      {
        id: "python-core",
        title: "Python Core",
        subtopics: ["Variables & Types", "Functions & Lambdas", "OOP (Classes, Inheritance)", "Decorators & Generators", "File I/O & Exceptions", "Virtual Environments & pip"],
        resources: [{ name: "Python Docs", url: "https://docs.python.org/3/" }, { name: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/" }],
        tasks: ["Write a CLI to-do app", "Build a web scraper with requests + BeautifulSoup", "Implement 5 sorting algorithms from scratch"],
        milestone: "Pass HackerRank Python Basic Certification",
      },
      {
        id: "dsa",
        title: "Data Structures & Algorithms",
        subtopics: ["Arrays, Strings, Hashing", "Linked Lists, Stacks, Queues", "Trees (BST, AVL)", "Graphs (BFS/DFS)", "Dynamic Programming", "Sorting & Searching"],
        resources: [{ name: "NeetCode 150", url: "https://neetcode.io/practice" }, { name: "CLRS Book (free PDF)", url: "https://github.com/lsayCode/CLRS" }],
        tasks: ["Solve 3 LeetCode problems/day", "Complete NeetCode Blind 75", "Implement a HashMap from scratch"],
        milestone: "Solve 150 LeetCode problems (Easy: 60, Medium: 70, Hard: 20)",
      },
      {
        id: "sql",
        title: "SQL & Databases",
        subtopics: ["SELECT, WHERE, GROUP BY, HAVING", "JOINs (INNER, LEFT, RIGHT, FULL)", "Subqueries & CTEs", "Indexes & Query Optimization", "PostgreSQL basics", "Schema Design & Normalization"],
        resources: [{ name: "SQLZoo", url: "https://sqlzoo.net/" }, { name: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial/" }],
        tasks: ["Complete all SQLZoo exercises", "Design a 5-table normalized schema", "Optimize a slow query using EXPLAIN"],
        milestone: "Pass HackerRank SQL Advanced Certificate",
      },
      {
        id: "linux",
        title: "Linux & Shell",
        subtopics: ["File system navigation", "Permissions & Users", "Bash scripting", "Process management (ps, kill, top)", "Networking (curl, ssh, netstat)", "Cron jobs & automation"],
        resources: [{ name: "The Linux Command Line (free)", url: "https://linuxcommand.org/tlcl.php" }, { name: "OverTheWire Bandit", url: "https://overthewire.org/wargames/bandit/" }],
        tasks: ["Write a Bash backup script", "Complete Bandit levels 1–20", "Set up a local dev environment with WSL2"],
        milestone: "Automate 3 personal tasks with Bash scripts",
      },
      {
        id: "git",
        title: "Git & Version Control",
        subtopics: ["Commit, Branch, Merge, Rebase", "Pull Requests & Code Review workflow", "Git Flow vs Trunk-based", "Conflict resolution", "GitHub Actions basics", "Semantic commits"],
        resources: [{ name: "Pro Git Book (free)", url: "https://git-scm.com/book/en/v2" }, { name: "Learn Git Branching", url: "https://learngitbranching.js.org/" }],
        tasks: ["Contribute to an open-source repo", "Set up a CI pipeline with GitHub Actions", "Practice interactive rebase"],
        milestone: "50+ public GitHub commits with clean history",
      },
    ],
  },
  {
    id: "aiml-cloud",
    phase: 2,
    title: "AI/ML + Cloud",
    subtitle: "ML · Deep Learning · AWS/GCP · MLOps",
    color: "#93C5FD",
    accent: "#1E3A5F",
    icon: "◈",
    durationWeeks: 20,
    topics: [
      {
        id: "ml-fundamentals",
        title: "Machine Learning Fundamentals",
        subtopics: ["Linear & Logistic Regression", "Decision Trees, Random Forests, XGBoost", "SVMs & Naive Bayes", "K-Means & DBSCAN clustering", "PCA & Dimensionality Reduction", "Model evaluation (ROC, AUC, F1, cross-val)"],
        resources: [{ name: "fast.ai (free)", url: "https://www.fast.ai/" }, { name: "Hands-On ML with Scikit-Learn (free PDF)", url: "https://github.com/ageron/handson-ml3" }],
        tasks: ["Build a Titanic survival predictor", "Kaggle: House Prices (top 25%)", "Implement Linear Regression from scratch using NumPy"],
        milestone: "Kaggle Notebooks Expert badge",
      },
      {
        id: "deep-learning",
        title: "Deep Learning & Neural Networks",
        subtopics: ["Feedforward NNs & backprop", "CNNs (ResNet, EfficientNet)", "RNNs, LSTMs, Transformers", "Attention mechanism & BERT", "Fine-tuning LLMs (LoRA, QLoRA)", "PyTorch from scratch"],
        resources: [{ name: "Deep Learning Specialization (Coursera audit)", url: "https://www.coursera.org/specializations/deep-learning" }, { name: "Andrej Karpathy YouTube", url: "https://www.youtube.com/@AndrejKarpathy" }],
        tasks: ["Train a CNN on CIFAR-10", "Fine-tune a HuggingFace model", "Build a mini GPT from scratch (Karpathy tutorial)"],
        milestone: "Deploy a working deep learning model to production",
      },
      {
        id: "cloud-aws",
        title: "AWS Cloud Architecture",
        subtopics: ["EC2, S3, IAM, VPC basics", "Lambda & Serverless", "RDS, DynamoDB, ElastiCache", "SageMaker for ML", "CloudFormation / CDK (IaC)", "Cost optimization strategies"],
        resources: [{ name: "AWS Free Tier", url: "https://aws.amazon.com/free/" }, { name: "AWS Skill Builder (free)", url: "https://skillbuilder.aws/" }],
        tasks: ["Host a static site on S3 + CloudFront", "Build a serverless REST API with Lambda + API Gateway", "Train a model on SageMaker"],
        milestone: "AWS Solutions Architect Associate certification",
      },
      {
        id: "mlops",
        title: "MLOps & Production ML",
        subtopics: ["ML Pipelines (Kubeflow, Airflow)", "Model versioning (MLflow, DVC)", "Docker & Kubernetes basics", "CI/CD for ML (GitHub Actions)", "Monitoring (Grafana, Evidently AI)", "Feature stores & data quality"],
        resources: [{ name: "Made With ML (free)", url: "https://madewithml.com/" }, { name: "Full Stack Deep Learning", url: "https://fullstackdeeplearning.com/" }],
        tasks: ["Containerize an ML model with Docker", "Build a retraining pipeline with Airflow", "Set up model monitoring with Evidently AI"],
        milestone: "Deploy a model with automated retraining pipeline",
      },
    ],
  },
  {
    id: "projects",
    phase: 3,
    title: "Portfolio Projects",
    subtitle: "4 High-Impact Real-World Projects",
    color: "#FCA5A5",
    accent: "#7F1D1D",
    icon: "◇",
    durationWeeks: 8,
    topics: [
      {
        id: "project1",
        title: "LLM-Powered Document Intelligence System",
        subtopics: ["RAG pipeline (LangChain + Pinecone)", "PDF parsing + chunking strategy", "FastAPI backend", "React frontend", "Dockerized deployment on AWS ECS"],
        resources: [{ name: "LangChain Docs", url: "https://docs.langchain.com/" }, { name: "Pinecone Quickstart", url: "https://docs.pinecone.io/" }],
        tasks: ["Implement vector embeddings", "Build chat UI with streaming", "Deploy to production with HTTPS"],
        milestone: "Live URL + GitHub repo with 50+ stars",
      },
      {
        id: "project2",
        title: "Real-Time ML Fraud Detection API",
        subtopics: ["Feature engineering on transaction data", "XGBoost + SHAP explainability", "FastAPI with async endpoints", "Redis caching", "Deployed on AWS Lambda"],
        resources: [{ name: "Kaggle Credit Card Fraud Dataset", url: "https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud" }],
        tasks: ["Train model with 99%+ AUC", "Sub-50ms API response time", "Add SHAP explanations to API response"],
        milestone: "Case study blog post published on Medium",
      },
    ],
  },
  {
    id: "certifications",
    phase: 4,
    title: "Certifications",
    subtitle: "AWS SAA · TensorFlow Dev · GCP Pro ML",
    color: "#FDE68A",
    accent: "#78350F",
    icon: "◆",
    durationWeeks: 10,
    topics: [
      { id: "aws-saa", title: "AWS Solutions Architect Associate", subtopics: ["Study with Adrian Cantrill course", "Take 5 practice exams", "Score 90%+ on practice before booking"], resources: [{ name: "Adrian Cantrill SAA-C03", url: "https://learn.cantrill.io/" }, { name: "Tutorials Dojo Practice Exams", url: "https://tutorialsdojo.com/" }], tasks: ["Complete all hands-on labs", "Score 850+ on real exam"], milestone: "Certificate earned — add to LinkedIn" },
      { id: "tf-dev", title: "TensorFlow Developer Certificate", subtopics: ["CNNs, NLP, Time Series in TF", "Model optimization & SavedModel", "TFLite for mobile deployment"], resources: [{ name: "TF Dev Certificate Study Guide", url: "https://www.tensorflow.org/certificate" }], tasks: ["Complete DeepLearning.AI TF Specialization", "Pass the 5-hour proctored exam"], milestone: "Google-issued certificate on LinkedIn" },
    ],
  },
  {
    id: "job-prep",
    phase: 5,
    title: "Job Preparation",
    subtitle: "Resume · Interview · Negotiation · Network",
    color: "#C4B5FD",
    accent: "#3B0764",
    icon: "◉",
    durationWeeks: 6,
    topics: [
      { id: "resume", title: "Resume & LinkedIn", subtopics: ["ATS-optimized resume format", "Quantified impact bullets", "LinkedIn profile optimization (SSI score)", "GitHub profile README", "Personal portfolio website"], resources: [{ name: "Tech Resume Inside Out", url: "https://thetechresume.com/" }], tasks: ["Get resume reviewed by 3 engineers", "Apply cold to 20 companies/week", "Connect with 5 hiring managers/week"], milestone: "Resume gets 30%+ response rate" },
      { id: "system-design", title: "System Design Interviews", subtopics: ["Scalability fundamentals", "Design Twitter, Uber, YouTube", "CAP theorem & consistency models", "Load balancing, CDN, caching layers", "Database sharding strategies"], resources: [{ name: "System Design Primer (free)", url: "https://github.com/donnemartin/system-design-primer" }, { name: "Grokking System Design", url: "https://www.educative.io/courses/grokking-the-system-design-interview" }], tasks: ["Do 20 mock system design sessions", "Record yourself solving a design problem"], milestone: "Clear system design rounds at 3 companies" },
      { id: "negotiation", title: "Salary Negotiation", subtopics: ["Know your market rate (levels.fyi)", "BATNA strategy", "Counter-offer scripts", "Equity & total comp analysis"], resources: [{ name: "Levels.fyi", url: "https://levels.fyi" }, { name: "Fearless Salary Negotiation", url: "https://fearlesssalarynegotiation.com/" }], tasks: ["Research comp for 20 target companies", "Practice negotiation roleplay"], milestone: "Negotiate 20%+ above initial offer" },
    ],
  },
];

const PROJECTS = [
  { id: "p1", title: "LLM Document Intelligence", stack: ["LangChain", "FastAPI", "React", "Pinecone", "AWS ECS"], why: "RAG systems are the #1 hiring signal for AI engineers in 2024–2025. Every enterprise is building one.", steps: { planning: ["Define use case & data sources", "Choose embedding model", "Design vector DB schema"], dev: ["Build ingestion pipeline", "Implement retrieval + reranking", "Create streaming chat UI"], deploy: ["Dockerize services", "Set up ECS + ALB", "Add auth with Cognito"] }, phase: "projects" },
  { id: "p2", title: "Real-Time Fraud Detection API", stack: ["XGBoost", "FastAPI", "Redis", "SHAP", "AWS Lambda"], why: "Demonstrates production ML skills: async APIs, caching, explainability — exactly what fintech pays $300K+ for.", steps: { planning: ["EDA on Kaggle dataset", "Feature engineering plan", "Define SLA (<50ms)"], dev: ["Train & tune XGBoost model", "Add SHAP explainability", "Build async FastAPI endpoints"], deploy: ["Package as Lambda + API Gateway", "Add CloudWatch monitoring", "Write load tests"] }, phase: "projects" },
  { id: "p3", title: "Cloud-Native MLOps Platform", stack: ["Airflow", "MLflow", "Docker", "Kubernetes", "GitHub Actions"], why: "MLOps roles pay 40% more than pure ML. This shows you can take models from notebook to production.", steps: { planning: ["Define model lifecycle", "Choose orchestration tool", "Design CI/CD pipeline"], dev: ["Build Airflow DAGs for retraining", "Integrate MLflow experiment tracking", "Write Helm charts for K8s"], deploy: ["Deploy on EKS", "Set up Grafana dashboards", "Add Evidently AI monitoring"] }, phase: "projects" },
  { id: "p4", title: "Multi-Modal AI Content Platform", stack: ["OpenAI API", "Stable Diffusion", "Next.js", "PostgreSQL", "Stripe"], why: "Shows full-stack AI product thinking. Investors & startups love founders who can ship. $500K+ equity upside.", steps: { planning: ["Define user flows", "API cost modeling", "DB schema design"], dev: ["Integrate GPT-4 + DALL-E APIs", "Build subscription system with Stripe", "Create gallery + editor UI"], deploy: ["Vercel + Neon DB", "Set up usage limits per tier", "Add analytics with PostHog"] }, phase: "projects" },
];

// Weekly rotating tasks — each phase has 4 weeks of tasks that cycle automatically
const WEEKLY_TASKS = {
  foundation: [
    // Week 1: Arrays & Python basics
    [
      { id: "w1d1", title: "Solve 2 LeetCode Array problems (Two Sum, Best Time to Buy)", duration: 45, tag: "DSA", xp: 30 },
      { id: "w1d2", title: "Read Python basics: Variables, Types, Functions", duration: 30, tag: "Python", xp: 20 },
      { id: "w1d3", title: "Write a Python CLI calculator", duration: 25, tag: "Python", xp: 20 },
      { id: "w1d4", title: "Practice SELECT, WHERE, GROUP BY on SQLZoo", duration: 25, tag: "SQL", xp: 20 },
      { id: "w1d5", title: "Git: init a repo, make 3 commits with semantic messages", duration: 15, tag: "Git", xp: 10 },
    ],
    // Week 2: Strings & OOP
    [
      { id: "w2d1", title: "Solve 2 LeetCode String problems (Valid Anagram, Reverse String)", duration: 45, tag: "DSA", xp: 30 },
      { id: "w2d2", title: "Study Python OOP: Classes, Inheritance, __init__", duration: 35, tag: "Python", xp: 25 },
      { id: "w2d3", title: "Build a Python class: BankAccount with deposit/withdraw", duration: 30, tag: "Python", xp: 20 },
      { id: "w2d4", title: "Practice JOINs (INNER, LEFT, RIGHT) on SQLZoo", duration: 25, tag: "SQL", xp: 20 },
      { id: "w2d5", title: "Git: create a branch, make changes, merge back to main", duration: 15, tag: "Git", xp: 10 },
    ],
    // Week 3: Linked Lists & Hashing
    [
      { id: "w3d1", title: "Solve 2 LeetCode Hashing problems (Group Anagrams, Top K)", duration: 50, tag: "DSA", xp: 35 },
      { id: "w3d2", title: "Study Python: Decorators, Generators, List Comprehensions", duration: 35, tag: "Python", xp: 25 },
      { id: "w3d3", title: "Implement a Linked List from scratch in Python", duration: 40, tag: "DSA", xp: 30 },
      { id: "w3d4", title: "Practice Subqueries & CTEs on Mode Analytics", duration: 30, tag: "SQL", xp: 25 },
      { id: "w3d5", title: "Linux: navigate file system, practice 10 bash commands", duration: 20, tag: "Linux", xp: 15 },
    ],
    // Week 4: Trees & Advanced Python
    [
      { id: "w4d1", title: "Solve 2 LeetCode Tree problems (Max Depth, Invert Tree)", duration: 50, tag: "DSA", xp: 35 },
      { id: "w4d2", title: "Study Python: File I/O, Exception handling, Virtual Envs", duration: 30, tag: "Python", xp: 20 },
      { id: "w4d3", title: "Build a web scraper with requests + BeautifulSoup", duration: 45, tag: "Python", xp: 35 },
      { id: "w4d4", title: "Design a 3-table SQL schema and write 5 queries on it", duration: 35, tag: "SQL", xp: 30 },
      { id: "w4d5", title: "Git: open a PR, write a description, simulate code review", duration: 15, tag: "Git", xp: 10 },
    ],
    // Week 5: Graphs & Algorithms
    [
      { id: "w5d1", title: "Solve 2 LeetCode Graph problems (Number of Islands, Clone Graph)", duration: 55, tag: "DSA", xp: 40 },
      { id: "w5d2", title: "Implement BFS and DFS from scratch in Python", duration: 40, tag: "DSA", xp: 30 },
      { id: "w5d3", title: "Write 3 sorting algorithms: Bubble, Merge, Quick Sort", duration: 40, tag: "Python", xp: 30 },
      { id: "w5d4", title: "Practice SQL: Indexes and EXPLAIN on a slow query", duration: 30, tag: "SQL", xp: 25 },
      { id: "w5d5", title: "Linux: write a Bash script to automate a task", duration: 25, tag: "Linux", xp: 20 },
    ],
    // Week 6: Dynamic Programming
    [
      { id: "w6d1", title: "Solve 2 LeetCode DP problems (Climbing Stairs, House Robber)", duration: 55, tag: "DSA", xp: 40 },
      { id: "w6d2", title: "Implement a HashMap from scratch in Python", duration: 45, tag: "DSA", xp: 35 },
      { id: "w6d3", title: "Build a Python project: File organizer CLI tool", duration: 50, tag: "Python", xp: 40 },
      { id: "w6d4", title: "Complete all SQLZoo exercises for the week", duration: 30, tag: "SQL", xp: 25 },
      { id: "w6d5", title: "Git: set up GitHub Actions CI pipeline on a repo", duration: 20, tag: "Git", xp: 15 },
    ],
  ],
  aiml_cloud: [
    // Week 1: ML Fundamentals
    [
      { id: "m1d1", title: "Study Linear Regression — implement from scratch in NumPy", duration: 60, tag: "ML", xp: 50 },
      { id: "m1d2", title: "Read fast.ai Lesson 1 + run notebook", duration: 45, tag: "ML", xp: 35 },
      { id: "m1d3", title: "Build Titanic predictor on Kaggle (EDA + basic model)", duration: 60, tag: "ML", xp: 50 },
      { id: "m1d4", title: "Complete 1 AWS free tier lab (EC2 basics)", duration: 40, tag: "Cloud", xp: 35 },
      { id: "m1d5", title: "Read 1 ML paper abstract on ArXiv (summarize in 3 lines)", duration: 20, tag: "Research", xp: 20 },
    ],
    // Week 2: Classification Models
    [
      { id: "m2d1", title: "Study Logistic Regression + implement in Python", duration: 55, tag: "ML", xp: 45 },
      { id: "m2d2", title: "Train Decision Tree + Random Forest on Titanic dataset", duration: 60, tag: "ML", xp: 50 },
      { id: "m2d3", title: "Study model evaluation: ROC, AUC, F1, Confusion Matrix", duration: 40, tag: "ML", xp: 35 },
      { id: "m2d4", title: "Complete 1 AWS lab: S3 + IAM basics", duration: 40, tag: "Cloud", xp: 35 },
      { id: "m2d5", title: "Review MLOps concept: What is a model pipeline?", duration: 25, tag: "MLOps", xp: 20 },
    ],
    // Week 3: Deep Learning
    [
      { id: "m3d1", title: "Study Neural Networks: layers, activation functions, backprop", duration: 60, tag: "Deep Learning", xp: 50 },
      { id: "m3d2", title: "Train a simple CNN on CIFAR-10 using PyTorch", duration: 70, tag: "Deep Learning", xp: 55 },
      { id: "m3d3", title: "Watch Andrej Karpathy: Neural Networks Zero to Hero (1 video)", duration: 50, tag: "Deep Learning", xp: 40 },
      { id: "m3d4", title: "Complete 1 AWS lab: Lambda + API Gateway serverless setup", duration: 45, tag: "Cloud", xp: 40 },
      { id: "m3d5", title: "Study Docker basics: build and run a container", duration: 35, tag: "MLOps", xp: 30 },
    ],
    // Week 4: LLMs & Cloud
    [
      { id: "m4d1", title: "Study Transformers & Attention mechanism (illustrated guide)", duration: 50, tag: "Deep Learning", xp: 40 },
      { id: "m4d2", title: "Fine-tune a HuggingFace model on a custom dataset", duration: 70, tag: "ML", xp: 55 },
      { id: "m4d3", title: "Build a simple RAG pipeline with LangChain + local embeddings", duration: 60, tag: "ML", xp: 50 },
      { id: "m4d4", title: "Complete AWS SageMaker lab: train a model on managed infra", duration: 50, tag: "Cloud", xp: 45 },
      { id: "m4d5", title: "Containerize an ML model with Docker + test locally", duration: 40, tag: "MLOps", xp: 35 },
    ],
  ],
  projects: [
    // Week 1: Planning & Setup
    [
      { id: "p1d1", title: "Write full project spec: features, tech stack, user flow", duration: 45, tag: "Build", xp: 35 },
      { id: "p1d2", title: "Set up project repo with folder structure + README skeleton", duration: 30, tag: "Git", xp: 25 },
      { id: "p1d3", title: "Write 50+ lines of backend code (models/routes)", duration: 90, tag: "Build", xp: 60 },
      { id: "p1d4", title: "Push to GitHub with meaningful commits", duration: 10, tag: "Git", xp: 10 },
      { id: "p1d5", title: "Review a similar open-source project for architecture ideas", duration: 30, tag: "Research", xp: 20 },
    ],
    // Week 2: Core Development
    [
      { id: "p2d1", title: "Write 50+ lines of frontend code (components/UI)", duration: 90, tag: "Build", xp: 60 },
      { id: "p2d2", title: "Connect frontend to backend: test 2 API endpoints", duration: 45, tag: "Build", xp: 40 },
      { id: "p2d3", title: "Write unit tests for 2 core functions", duration: 35, tag: "Build", xp: 30 },
      { id: "p2d4", title: "Update README with setup instructions", duration: 20, tag: "Docs", xp: 15 },
      { id: "p2d5", title: "Review and fix 3 bugs or UI issues", duration: 40, tag: "Build", xp: 30 },
    ],
    // Week 3: Integration & Polish
    [
      { id: "p3d1", title: "Implement auth or a major feature end-to-end", duration: 90, tag: "Build", xp: 60 },
      { id: "p3d2", title: "Add error handling and loading states to all API calls", duration: 40, tag: "Build", xp: 35 },
      { id: "p3d3", title: "Write project blog post draft (500 words)", duration: 45, tag: "Docs", xp: 35 },
      { id: "p3d4", title: "Get feedback from 1 person — implement 1 suggestion", duration: 30, tag: "Build", xp: 25 },
      { id: "p3d5", title: "Push all changes, tag v0.1 release on GitHub", duration: 10, tag: "Git", xp: 10 },
    ],
    // Week 4: Deployment
    [
      { id: "p4d1", title: "Dockerize the app and test container locally", duration: 50, tag: "Build", xp: 45 },
      { id: "p4d2", title: "Deploy to production: Vercel/Railway/Render", duration: 45, tag: "Build", xp: 40 },
      { id: "p4d3", title: "Test live app end-to-end, fix any production bugs", duration: 40, tag: "Build", xp: 35 },
      { id: "p4d4", title: "Write full README with screenshots and live demo link", duration: 30, tag: "Docs", xp: 25 },
      { id: "p4d5", title: "Share on LinkedIn with a post about what you built", duration: 20, tag: "Network", xp: 20 },
    ],
  ],
  certifications: [
    // Week 1
    [
      { id: "c1d1", title: "Complete 2 certification study modules", duration: 60, tag: "Cert", xp: 45 },
      { id: "c1d2", title: "Take 20-question practice quiz + review wrong answers", duration: 25, tag: "Cert", xp: 20 },
      { id: "c1d3", title: "Make Anki flashcards for 10 new concepts", duration: 20, tag: "Review", xp: 15 },
      { id: "c1d4", title: "Do 1 hands-on lab from the certification course", duration: 45, tag: "Cert", xp: 40 },
      { id: "c1d5", title: "Review previous week flashcards (30 cards)", duration: 15, tag: "Review", xp: 10 },
    ],
    // Week 2
    [
      { id: "c2d1", title: "Complete 2 certification study modules", duration: 60, tag: "Cert", xp: 45 },
      { id: "c2d2", title: "Take a full 65-question practice exam", duration: 80, tag: "Cert", xp: 60 },
      { id: "c2d3", title: "Review all wrong answers from practice exam in detail", duration: 40, tag: "Review", xp: 30 },
      { id: "c2d4", title: "Do 1 hands-on lab — focus on weakest topic", duration: 50, tag: "Cert", xp: 40 },
      { id: "c2d5", title: "Review flashcards + add 10 new ones", duration: 20, tag: "Review", xp: 15 },
    ],
  ],
  job_prep: [
    // Week 1: Resume & Applications
    [
      { id: "j1d1", title: "Solve 1 system design problem: Design a URL shortener", duration: 45, tag: "Interview", xp: 35 },
      { id: "j1d2", title: "Apply to 5 targeted job postings with tailored cover letter", duration: 40, tag: "Apply", xp: 30 },
      { id: "j1d3", title: "Record 1 mock behavioral answer: Tell me about yourself", duration: 20, tag: "Interview", xp: 20 },
      { id: "j1d4", title: "Send 3 LinkedIn connection requests to engineers at target companies", duration: 15, tag: "Network", xp: 15 },
      { id: "j1d5", title: "Research salary ranges for 5 target companies on levels.fyi", duration: 20, tag: "Interview", xp: 15 },
    ],
    // Week 2: Interviews
    [
      { id: "j2d1", title: "Solve 1 system design: Design Twitter feed", duration: 50, tag: "Interview", xp: 40 },
      { id: "j2d2", title: "Apply to 5 more job postings", duration: 35, tag: "Apply", xp: 25 },
      { id: "j2d3", title: "Record mock answer: Describe a challenge you overcame", duration: 20, tag: "Interview", xp: 20 },
      { id: "j2d4", title: "Do a full mock interview with a friend or using Pramp", duration: 60, tag: "Interview", xp: 50 },
      { id: "j2d5", title: "Follow up on 3 previous applications via LinkedIn", duration: 15, tag: "Network", xp: 15 },
    ],
  ],
};

// Get current week number since app start (stored in localStorage)
function getCurrentWeekTasks(phase) {
  const startKey = "cos_start_date";
  let startDate = localStorage.getItem(startKey);
  if (!startDate) {
    startDate = new Date().toISOString().split("T")[0];
    localStorage.setItem(startKey, startDate);
  }
  const start = new Date(startDate);
  const now = new Date();
  const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const weekIndex = Math.floor(diffDays / 7);
  const weeks = WEEKLY_TASKS[phase] || WEEKLY_TASKS.foundation;
  const currentWeek = weeks[weekIndex % weeks.length];
  return { tasks: currentWeek, weekNum: weekIndex + 1, topic: getWeekTopic(phase, weekIndex) };
}

function getWeekTopic(phase, weekIndex) {
  const topics = {
    foundation: ["Arrays & Python Basics", "Strings & OOP", "Linked Lists & Hashing", "Trees & Advanced Python", "Graphs & Algorithms", "Dynamic Programming"],
    aiml_cloud: ["ML Fundamentals", "Classification Models", "Deep Learning", "LLMs & Cloud"],
    projects: ["Planning & Setup", "Core Development", "Integration & Polish", "Deployment"],
    certifications: ["Study & Labs", "Practice Exams"],
    job_prep: ["Resume & Applications", "Mock Interviews"],
  };
  const t = topics[phase] || topics.foundation;
  return t[weekIndex % t.length];
}

const COACH_MESSAGES = [
  { trigger: "missed_1", message: "One missed day is noise. What matters is today. Pick one task and start — momentum > perfection." },
  { trigger: "missed_2", message: "2 days off. Time to re-anchor. The goal isn't a perfect streak — it's showing up most days for 365 days straight. Let's go." },
  { trigger: "missed_3", message: "3+ days missed. The plan needs surgery, not guilt. Drop 1 daily task. Reduce session to 45 minutes. Restart small. Consistency at 60% beats sprinting and crashing." },
  { trigger: "streak_7", message: "7-day streak. This is where amateurs stop. Keep going — the compound effect hasn't started yet." },
  { trigger: "streak_30", message: "30 days. You're no longer a beginner at this habit. Your future self is watching this moment." },
  { trigger: "phase_complete", message: "Phase complete. Take 1 day to reflect: what was harder than expected? What surprised you? Then move to the next phase." },
  { trigger: "low_progress", message: "Progress is below 20% for the week. Consider: are tasks too big? Break them in half. Are you scheduling them? Block time on your calendar NOW." },
  { trigger: "default", message: "The difference between a $100K and $500K engineer is not intelligence — it's relentless daily iteration. You're building that habit right now." },
];

// ============================================================
// UTILS
// ============================================================
const today = () => new Date().toISOString().split("T")[0];
const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : initial; } catch { return initial; }
  });
  const set = useCallback((v) => {
    setState(v);
    try { localStorage.setItem(key, JSON.stringify(typeof v === "function" ? v(state) : v)); } catch {}
  }, [key]);
  return [state, set];
}

// ============================================================
// MAIN APP
// ============================================================
export default function CareerOS() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [completedTasks, setCompletedTasks] = useLocalStorage("cos_tasks", {});
  const [phaseProgress, setPhaseProgress] = useLocalStorage("cos_phase", { foundation: 8, aiml_cloud: 0, projects: 0, certifications: 0, job_prep: 0 });
  const [skillLevels, setSkillLevels] = useLocalStorage("cos_skills", { Python: 15, DSA: 10, SQL: 5, "Linux/Git": 20, "ML Theory": 0, "Deep Learning": 0, "AWS/Cloud": 5, MLOps: 0, "System Design": 0, "LLM/Agents": 0 });
  const [streak, setStreak] = useLocalStorage("cos_streak", { current: 0, longest: 0, lastActive: "", totalDays: 0 });
  const [activePhase, setActivePhase] = useLocalStorage("cos_active_phase", "foundation");
  const [xp, setXp] = useLocalStorage("cos_xp", 0);
  const [notes, setNotes] = useLocalStorage("cos_notes", "");
  const [coachMsg, setCoachMsg] = useState(COACH_MESSAGES.find(m => m.trigger === "default").message);
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [notification, setNotification] = useState(null);

  const todayKey = today();
  const { tasks: todayTasks, weekNum, topic: weekTopic } = getCurrentWeekTasks(activePhase);
  const todayCompleted = completedTasks[todayKey] || [];

  // ── FIXED STREAK LOGIC ──
  useEffect(() => {
    const todayStr = today();
    const completedToday = (completedTasks[todayStr] || []).length;
    if (completedToday === 0) return;

    setStreak(prev => {
      if (prev.lastActive === todayStr) return prev; // already counted today
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];
      const newCurrent = prev.lastActive === yesterdayStr ? (prev.current || 0) + 1 : 1;
      return {
        current: newCurrent,
        longest: Math.max(newCurrent, prev.longest || 0),
        lastActive: todayStr,
        totalDays: (prev.totalDays || 0) + 1,
      };
    });
  }, [completedTasks]);

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleTask = (taskId, xpVal) => {
    const wasCompleted = todayCompleted.includes(taskId);
    const newCompleted = wasCompleted
      ? todayCompleted.filter(id => id !== taskId)
      : [...todayCompleted, taskId];

    setCompletedTasks(prev => ({ ...prev, [todayKey]: newCompleted }));
    if (!wasCompleted) {
      setXp(x => x + xpVal);
      showNotif(`+${xpVal} XP earned`, "success");
    } else {
      setXp(x => Math.max(0, x - xpVal));
    }
  };

  const updateSkill = (skill, delta) => {
    setSkillLevels(prev => ({ ...prev, [skill]: Math.min(100, Math.max(0, (prev[skill] || 0) + delta)) }));
  };

  const totalProgress = Math.round(Object.values(phaseProgress).reduce((a, b) => a + b, 0) / 5);
  const level = Math.floor(xp / 100) + 1;
  const xpToNext = 100 - (xp % 100);

  const phaseColors = { foundation: "#6EE7B7", aiml_cloud: "#93C5FD", projects: "#FCA5A5", certifications: "#FDE68A", job_prep: "#C4B5FD" };
  const phaseLabels = { foundation: "Foundation", aiml_cloud: "AI/ML + Cloud", projects: "Projects", certifications: "Certs", job_prep: "Job Prep" };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "⌘" },
    { id: "daily", label: "Daily", icon: "◎" },
    { id: "roadmap", label: "Roadmap", icon: "◈" },
    { id: "projects", label: "Projects", icon: "◇" },
    { id: "skills", label: "Skills", icon: "◆" },
    { id: "coach", label: "AI Coach", icon: "◉" },
  ];

  return (
    <div style={styles.root}>
      {/* Background */}
      <div style={styles.bg} />
      <div style={styles.bgGrid} />

      {/* Notification */}
      {notification && (
        <div style={{ ...styles.notif, background: notification.type === "success" ? "rgba(110,231,183,0.15)" : "rgba(252,165,165,0.15)", borderColor: notification.type === "success" ? "#6EE7B7" : "#FCA5A5" }}>
          {notification.msg}
        </div>
      )}

      {/* Sidebar */}
      <nav style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <span style={styles.logoIcon}>⬡</span>
          <div>
            <div style={styles.logoText}>CareerOS</div>
            <div style={styles.logoSub}>AI/ML Track</div>
          </div>
        </div>

        <div style={styles.levelBadge}>
          <div style={styles.levelRow}>
            <span style={styles.levelLabel}>Level {level}</span>
            <span style={styles.xpLabel}>{xp} XP</span>
          </div>
          <div style={styles.xpBar}>
            <div style={{ ...styles.xpFill, width: `${(xp % 100)}%` }} />
          </div>
          <div style={styles.xpNext}>{xpToNext} XP to next level</div>
        </div>

        <div style={styles.navList}>
          {tabs.map(t => (
            <button key={t.id} style={{ ...styles.navItem, ...(activeTab === t.id ? styles.navItemActive : {}) }} onClick={() => setActiveTab(t.id)}>
              <span style={styles.navIcon}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div style={styles.sidebarBottom}>
          <div style={styles.streakCard}>
            <div style={styles.streakNum}>{streak.current}</div>
            <div style={styles.streakLabel}>day streak 🔥</div>
          </div>
          <div style={styles.totalProg}>
            <div style={styles.totalProgLabel}>Overall Progress</div>
            <div style={styles.totalProgBar}>
              <div style={{ ...styles.totalProgFill, width: `${totalProgress}%` }} />
            </div>
            <div style={styles.totalProgPct}>{totalProgress}%</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        {activeTab === "dashboard" && <Dashboard phaseProgress={phaseProgress} setPhaseProgress={setPhaseProgress} todayTasks={todayTasks} todayCompleted={todayCompleted} toggleTask={toggleTask} streak={streak} xp={xp} level={level} activePhase={activePhase} setActivePhase={setActivePhase} phaseColors={phaseColors} phaseLabels={phaseLabels} coachMsg={coachMsg} totalProgress={totalProgress} weekNum={weekNum} weekTopic={weekTopic} />}
        {activeTab === "daily" && <DailyView todayTasks={todayTasks} todayCompleted={todayCompleted} toggleTask={toggleTask} streak={streak} activePhase={activePhase} setActivePhase={setActivePhase} phaseLabels={phaseLabels} notes={notes} setNotes={setNotes} completedTasks={completedTasks} weekNum={weekNum} weekTopic={weekTopic} />}
        {activeTab === "roadmap" && <RoadmapView expandedPhase={expandedPhase} setExpandedPhase={setExpandedPhase} phaseProgress={phaseProgress} setPhaseProgress={setPhaseProgress} activePhase={activePhase} setActivePhase={setActivePhase} />}
        {activeTab === "projects" && <ProjectsView expandedProject={expandedProject} setExpandedProject={setExpandedProject} />}
        {activeTab === "skills" && <SkillsView skillLevels={skillLevels} updateSkill={updateSkill} />}
        {activeTab === "coach" && <CoachView streak={streak} phaseProgress={phaseProgress} todayCompleted={todayCompleted} todayTasks={todayTasks} activePhase={activePhase} />}
      </main>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({ phaseProgress, todayTasks, todayCompleted, toggleTask, streak, xp, level, activePhase, setActivePhase, phaseColors, phaseLabels, coachMsg, totalProgress, weekNum, weekTopic }) {
  const completionPct = Math.round((todayCompleted.length / todayTasks.length) * 100);
  const phases = Object.keys(phaseProgress);

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Good {getTimeOfDay()}</h1>
          <p style={styles.pageSubtitle}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {completionPct}% of today complete</p>
        </div>
        <div style={styles.headerStats}>
          <StatPill label="Streak" value={`${streak.current}d 🔥`} color="#FDE68A" />
          <StatPill label="XP" value={xp} color="#6EE7B7" />
          <StatPill label="Level" value={level} color="#C4B5FD" />
        </div>
      </div>

      {/* Today's progress banner */}
      <div style={styles.todayBanner}>
        <div style={styles.todayBannerLeft}>
          <div style={styles.todayBannerTitle}>Today's Mission</div>
          <div style={styles.todayBannerSub}>{todayCompleted.length}/{todayTasks.length} tasks · {todayTasks.reduce((a, t) => a + t.duration, 0)} min total</div>
          <div style={{fontSize:11,color:"#6EE7B7",marginBottom:8}}>Week {weekNum} · {weekTopic}</div>
          <div style={styles.todayProgressBar}>
            <div style={{ ...styles.todayProgressFill, width: `${completionPct}%` }} />
          </div>
        </div>
        <div style={styles.todayBannerRight}>
          <div style={styles.bigPercent}>{completionPct}<span style={{ fontSize: 20 }}>%</span></div>
        </div>
      </div>

      {/* Quick tasks */}
      <div style={styles.sectionTitle}>Today's Checklist</div>
      <div style={styles.taskGrid}>
        {todayTasks.map(task => (
          <QuickTaskCard key={task.id} task={task} done={todayCompleted.includes(task.id)} onToggle={() => toggleTask(task.id, task.xp)} />
        ))}
      </div>

      {/* Phase Progress */}
      <div style={styles.sectionTitle}>Phase Progress</div>
      <div style={styles.phaseGrid}>
        {phases.map((ph, i) => (
          <PhaseProgressCard key={ph} phase={ph} label={phaseLabels[ph]} progress={phaseProgress[ph]} color={phaseColors[ph]} active={activePhase === ph} onClick={() => setActivePhase(ph)} phaseNum={i + 1} />
        ))}
      </div>

      {/* Coach */}
      <div style={styles.coachBanner}>
        <div style={styles.coachIcon}>◉</div>
        <div>
          <div style={styles.coachLabel}>AI Coach</div>
          <div style={styles.coachText}>{coachMsg}</div>
        </div>
      </div>
    </div>
  );
}

function StatPill({ label, value, color }) {
  return (
    <div style={{ ...styles.statPill, borderColor: color + "40", background: color + "12" }}>
      <div style={{ ...styles.statPillVal, color }}>{value}</div>
      <div style={styles.statPillLabel}>{label}</div>
    </div>
  );
}

function QuickTaskCard({ task, done, onToggle }) {
  const tagColors = { DSA: "#6EE7B7", Python: "#93C5FD", SQL: "#FCA5A5", "Linux/Git": "#FDE68A", Git: "#FDE68A", ML: "#93C5FD", Cloud: "#6EE7B7", MLOps: "#FCA5A5", Build: "#C4B5FD", Docs: "#6EE7B7", Research: "#FDE68A", Cert: "#C4B5FD", Review: "#6EE7B7", Interview: "#FCA5A5", Apply: "#FDE68A", Network: "#93C5FD", Collab: "#C4B5FD" };
  const col = tagColors[task.tag] || "#888";

  return (
    <div style={{ ...styles.taskCard, ...(done ? styles.taskCardDone : {}) }} onClick={onToggle}>
      <div style={styles.taskCardLeft}>
        <div style={{ ...styles.taskCheck, ...(done ? styles.taskCheckDone : {}), borderColor: done ? col : "#444" }}>
          {done && <span style={{ color: "#000", fontSize: 11, fontWeight: 700 }}>✓</span>}
        </div>
        <div>
          <div style={{ ...styles.taskTitle, ...(done ? { textDecoration: "line-through", opacity: 0.5 } : {}) }}>{task.title}</div>
          <div style={styles.taskMeta}>{task.duration} min · <span style={{ color: col }}>+{task.xp} XP</span></div>
        </div>
      </div>
      <div style={{ ...styles.taskTag, background: col + "20", color: col }}>{task.tag}</div>
    </div>
  );
}

function PhaseProgressCard({ phase, label, progress, color, active, onClick, phaseNum }) {
  return (
    <div style={{ ...styles.phaseCard, ...(active ? { ...styles.phaseCardActive, borderColor: color + "60" } : {}) }} onClick={onClick}>
      <div style={styles.phaseCardHeader}>
        <div style={{ ...styles.phaseNum, color }}>{String(phaseNum).padStart(2, "0")}</div>
        <div style={{ ...styles.phasePct, color }}>{progress}%</div>
      </div>
      <div style={styles.phaseLabel}>{label}</div>
      <div style={styles.phaseBar}>
        <div style={{ ...styles.phaseFill, width: `${progress}%`, background: color }} />
      </div>
      {active && <div style={{ ...styles.activeChip, background: color + "20", color }}>Active</div>}
    </div>
  );
}

// ============================================================
// DAILY VIEW
// ============================================================
function DailyView({ todayTasks, todayCompleted, toggleTask, streak, activePhase, setActivePhase, phaseLabels, notes, setNotes, completedTasks, weekNum, weekTopic }) {
  const phases = Object.keys(phaseLabels);
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    const tasks = DAILY_TASKS_BY_PHASE[activePhase] || [];
    const done = (completedTasks[key] || []).length;
    return { date: d, key, done, total: tasks.length, pct: tasks.length ? Math.round((done / tasks.length) * 100) : 0 };
  });

  const totalTime = todayTasks.reduce((a, t) => a + t.duration, 0);
  const doneTime = todayTasks.filter(t => todayCompleted.includes(t.id)).reduce((a, t) => a + t.duration, 0);

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Daily System</h1>
          <p style={styles.pageSubtitle}>Your structured daily execution engine · <span style={{color:"#6EE7B7"}}>Week {weekNum}: {weekTopic}</span></p>
        </div>
      </div>

      {/* Phase Selector */}
      <div style={styles.phaseTabs}>
        {phases.map(ph => (
          <button key={ph} style={{ ...styles.phaseTab, ...(activePhase === ph ? styles.phaseTabActive : {}) }} onClick={() => setActivePhase(ph)}>
            {phaseLabels[ph]}
          </button>
        ))}
      </div>

      {/* Time summary */}
      <div style={styles.timeSummary}>
        <div style={styles.timeStat}><div style={styles.timeVal}>{totalTime}m</div><div style={styles.timeLabel}>Total today</div></div>
        <div style={styles.timeStat}><div style={{ ...styles.timeVal, color: "#6EE7B7" }}>{doneTime}m</div><div style={styles.timeLabel}>Done</div></div>
        <div style={styles.timeStat}><div style={{ ...styles.timeVal, color: "#FDE68A" }}>{totalTime - doneTime}m</div><div style={styles.timeLabel}>Remaining</div></div>
        <div style={styles.timeStat}><div style={{ ...styles.timeVal, color: "#FCA5A5" }}>{streak.current}</div><div style={styles.timeLabel}>🔥 Streak</div></div>
      </div>

      {/* Task List */}
      <div style={styles.sectionTitle}>Today's Tasks</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {todayTasks.map((task, i) => (
          <FullTaskRow key={task.id} task={task} done={todayCompleted.includes(task.id)} onToggle={() => toggleTask(task.id, task.xp)} index={i} />
        ))}
      </div>

      {/* Weekly heatmap */}
      <div style={styles.sectionTitle}>This Week</div>
      <div style={styles.heatmap}>
        {last7.map(day => (
          <div key={day.key} style={styles.heatDay}>
            <div style={{ ...styles.heatBar, height: `${Math.max(4, day.pct * 0.6)}px`, background: day.pct > 80 ? "#6EE7B7" : day.pct > 40 ? "#FDE68A" : day.pct > 0 ? "#FCA5A5" : "#1a1a1a" }} />
            <div style={styles.heatLabel}>{day.date.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 1)}</div>
            <div style={styles.heatPct}>{day.pct}%</div>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div style={styles.sectionTitle}>Session Notes</div>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        style={styles.notesArea}
        placeholder="What did you learn today? What was hard? What will you do differently tomorrow?"
      />
    </div>
  );
}

function FullTaskRow({ task, done, onToggle, index }) {
  const [expanded, setExpanded] = useState(false);
  const tagColors = { DSA: "#6EE7B7", Python: "#93C5FD", SQL: "#FCA5A5", Git: "#FDE68A", ML: "#93C5FD", Cloud: "#6EE7B7", MLOps: "#FCA5A5", Build: "#C4B5FD", Research: "#FDE68A", Cert: "#C4B5FD", Interview: "#FCA5A5", Apply: "#FDE68A", Network: "#93C5FD", Review: "#6EE7B7", Docs: "#6EE7B7", Collab: "#C4B5FD" };
  const col = tagColors[task.tag] || "#888";

  return (
    <div style={{ ...styles.fullTask, borderColor: done ? col + "40" : "#1e1e1e" }}>
      <div style={styles.fullTaskMain} onClick={onToggle}>
        <div style={{ ...styles.taskCheck, ...(done ? { ...styles.taskCheckDone, background: col, borderColor: col } : {}), width: 22, height: 22 }}>
          {done && <span style={{ color: "#000", fontSize: 12, fontWeight: 700 }}>✓</span>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ ...styles.taskTitle, ...(done ? { textDecoration: "line-through", opacity: 0.4 } : {}), fontSize: 14 }}>{task.title}</div>
          <div style={styles.taskMeta}>
            <span style={{ color: "#555" }}>⏱ {task.duration} min</span>
            <span style={{ color: col }}>+{task.xp} XP</span>
            <span style={{ background: col + "20", color: col, padding: "1px 8px", borderRadius: 4, fontSize: 10 }}>{task.tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ROADMAP VIEW
// ============================================================
function RoadmapView({ expandedPhase, setExpandedPhase, phaseProgress, setPhaseProgress, activePhase, setActivePhase }) {
  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Roadmap</h1>
          <p style={styles.pageSubtitle}>56-week structured path to 7-figure AI/ML career</p>
        </div>
      </div>

      <div style={styles.roadmapTimeline}>
        {ROADMAP.map((phase, i) => (
          <RoadmapPhaseCard
            key={phase.id}
            phase={phase}
            progress={phaseProgress[phase.id.replace("-", "_")] || phaseProgress[phase.id] || 0}
            expanded={expandedPhase === phase.id}
            onToggle={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
            isActive={activePhase === phase.id}
            onActivate={() => setActivePhase(phase.id)}
            onProgressChange={(v) => {
              const key = phase.id.replace("-", "_");
              setPhaseProgress(prev => ({ ...prev, [key]: v, [phase.id]: v }));
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RoadmapPhaseCard({ phase, progress, expanded, onToggle, isActive, onActivate, onProgressChange }) {
  return (
    <div style={{ ...styles.roadmapCard, borderColor: expanded ? phase.color + "50" : "#1a1a1a" }}>
      <div style={styles.roadmapCardHeader} onClick={onToggle}>
        <div style={styles.roadmapLeft}>
          <div style={{ ...styles.phaseIcon, background: phase.color + "15", color: phase.color }}>{phase.icon}</div>
          <div>
            <div style={styles.roadmapTitle}>Phase {phase.phase}: {phase.title}</div>
            <div style={styles.roadmapSub}>{phase.subtitle} · {phase.durationWeeks} weeks</div>
          </div>
        </div>
        <div style={styles.roadmapRight}>
          {isActive && <div style={{ ...styles.activeChip, background: phase.color + "20", color: phase.color, marginRight: 12 }}>Active</div>}
          <div style={{ ...styles.phasePct, color: phase.color, fontSize: 18 }}>{progress}%</div>
          <div style={{ color: "#444", marginLeft: 12 }}>{expanded ? "▲" : "▼"}</div>
        </div>
      </div>

      <div style={styles.roadmapProgressRow}>
        <div style={{ ...styles.phaseBar, marginTop: 0 }}>
          <div style={{ ...styles.phaseFill, width: `${progress}%`, background: phase.color }} />
        </div>
      </div>

      {expanded && (
        <div style={styles.roadmapExpanded}>
          <div style={styles.progressAdjust}>
            <span style={{ color: "#666", fontSize: 12 }}>Adjust progress:</span>
            <input type="range" min={0} max={100} value={progress} onChange={e => onProgressChange(Number(e.target.value))} style={styles.slider} />
            <button style={{ ...styles.activateBtn, background: phase.color + "20", color: phase.color, borderColor: phase.color + "40" }} onClick={onActivate}>
              {isActive ? "✓ Active" : "Set Active"}
            </button>
          </div>

          {phase.topics.map(topic => (
            <TopicCard key={topic.id} topic={topic} color={phase.color} />
          ))}
        </div>
      )}
    </div>
  );
}

function TopicCard({ topic, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.topicCard}>
      <div style={styles.topicHeader} onClick={() => setOpen(!open)}>
        <div style={{ ...styles.topicTitle, color }}>{topic.title}</div>
        <span style={{ color: "#444" }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={styles.topicBody}>
          <div style={styles.topicSection}><div style={styles.topicSectionLabel}>Subtopics</div>
            <div style={styles.subtopicList}>{topic.subtopics.map((s, i) => <div key={i} style={styles.subtopicItem}>· {s}</div>)}</div>
          </div>
          <div style={styles.topicSection}><div style={styles.topicSectionLabel}>Practice Tasks</div>
            <div style={styles.subtopicList}>{topic.tasks.map((t, i) => <div key={i} style={{ ...styles.subtopicItem, color: "#93C5FD" }}>→ {t}</div>)}</div>
          </div>
          <div style={styles.topicSection}><div style={styles.topicSectionLabel}>Resources</div>
            <div style={styles.subtopicList}>{topic.resources.map((r, i) => <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{ ...styles.subtopicItem, color: "#6EE7B7", display: "block", textDecoration: "none" }}>↗ {r.name}</a>)}</div>
          </div>
          <div style={{ ...styles.milestoneBox, borderColor: color + "40", background: color + "08" }}>
            <span style={{ color }}>🏁 Milestone: </span><span style={{ color: "#ccc" }}>{topic.milestone}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PROJECTS VIEW
// ============================================================
function ProjectsView({ expandedProject, setExpandedProject }) {
  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Project Builder</h1>
          <p style={styles.pageSubtitle}>4 high-signal projects that hiring managers notice</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} expanded={expandedProject === project.id} onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, expanded, onToggle }) {
  const colors = ["#6EE7B7", "#93C5FD", "#FCA5A5", "#C4B5FD"];
  const color = colors[index % colors.length];
  const [activeStep, setActiveStep] = useState("planning");

  return (
    <div style={{ ...styles.projectCard, borderColor: expanded ? color + "50" : "#1a1a1a" }}>
      <div style={styles.projectHeader} onClick={onToggle}>
        <div style={styles.projectLeft}>
          <div style={{ ...styles.projectNum, color }}>{String(index + 1).padStart(2, "0")}</div>
          <div>
            <div style={styles.projectTitle}>{project.title}</div>
            <div style={styles.projectStack}>{project.stack.map(t => <span key={t} style={{ ...styles.stackTag, background: color + "15", color }}>{t}</span>)}</div>
          </div>
        </div>
        <span style={{ color: "#444" }}>{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div style={styles.projectBody}>
          <div style={{ ...styles.whyBox, borderColor: color + "40", background: color + "08" }}>
            <span style={{ color, fontWeight: 600 }}>💡 Why this matters: </span>
            <span style={{ color: "#bbb" }}>{project.why}</span>
          </div>

          <div style={styles.stepTabs}>
            {["planning", "dev", "deploy"].map(s => (
              <button key={s} style={{ ...styles.stepTab, ...(activeStep === s ? { ...styles.stepTabActive, borderColor: color, color } : {}) }} onClick={() => setActiveStep(s)}>
                {s === "planning" ? "📋 Planning" : s === "dev" ? "⚙️ Development" : "🚀 Deployment"}
              </button>
            ))}
          </div>

          <div style={styles.stepList}>
            {project.steps[activeStep]?.map((step, i) => (
              <div key={i} style={styles.stepItem}>
                <div style={{ ...styles.stepDot, background: color }} />
                <div style={styles.stepText}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SKILLS VIEW
// ============================================================
function SkillsView({ skillLevels, updateSkill }) {
  const getLevel = (pct) => pct < 25 ? "Beginner" : pct < 55 ? "Intermediate" : pct < 80 ? "Advanced" : "Expert";
  const getLevelColor = (pct) => pct < 25 ? "#FCA5A5" : pct < 55 ? "#FDE68A" : pct < 80 ? "#93C5FD" : "#6EE7B7";

  const skillGroups = {
    "Core Engineering": ["Python", "DSA", "SQL", "Linux/Git"],
    "AI/ML": ["ML Theory", "Deep Learning", "LLM/Agents"],
    "Cloud & Ops": ["AWS/Cloud", "MLOps", "System Design"],
  };

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Skill Tracker</h1>
          <p style={styles.pageSubtitle}>Beginner → Expert progression across all domains</p>
        </div>
      </div>

      {Object.entries(skillGroups).map(([group, skills]) => (
        <div key={group} style={{ marginBottom: 32 }}>
          <div style={styles.sectionTitle}>{group}</div>
          <div style={styles.skillGrid}>
            {skills.map(skill => {
              const pct = skillLevels[skill] || 0;
              const col = getLevelColor(pct);
              return (
                <div key={skill} style={styles.skillCard}>
                  <div style={styles.skillCardHeader}>
                    <div style={styles.skillName}>{skill}</div>
                    <div style={{ ...styles.skillLevel, color: col }}>{getLevel(pct)}</div>
                  </div>
                  <div style={styles.skillBarBg}>
                    <div style={{ ...styles.skillBarFill, width: `${pct}%`, background: `linear-gradient(90deg, ${col}80, ${col})` }} />
                  </div>
                  <div style={styles.skillCardFooter}>
                    <span style={{ color: "#555", fontSize: 12 }}>{pct}%</span>
                    <div style={styles.skillBtns}>
                      <button style={styles.skillBtn} onClick={() => updateSkill(skill, -5)}>−</button>
                      <button style={{ ...styles.skillBtn, color: col }} onClick={() => updateSkill(skill, 5)}>+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// AI COACH VIEW
// ============================================================
function CoachView({ streak, phaseProgress, todayCompleted, todayTasks, activePhase }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "coach", text: "I'm your AI Coach. I track your consistency, phase progress, and help you recalibrate when you fall behind. Ask me anything about your career path." }
  ]);
  const [loading, setLoading] = useState(false);
  const msgEnd = useRef(null);

  useEffect(() => { msgEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const completionToday = Math.round((todayCompleted.length / Math.max(1, todayTasks.length)) * 100);

  const getCoachInsight = () => {
    if (streak.current === 0) return COACH_MESSAGES.find(m => m.trigger === "missed_3").message;
    if (streak.current >= 30) return COACH_MESSAGES.find(m => m.trigger === "streak_30").message;
    if (streak.current >= 7) return COACH_MESSAGES.find(m => m.trigger === "streak_7").message;
    if (completionToday < 20) return COACH_MESSAGES.find(m => m.trigger === "low_progress").message;
    return COACH_MESSAGES.find(m => m.trigger === "default").message;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    const context = `You are an elite career coach for a software engineer pursuing a 7-figure ($300K-$500K+) career in AI/ML and Cloud engineering. 
    
Current user stats:
- Streak: ${streak.current} days
- Active phase: ${activePhase}
- Today's completion: ${completionToday}%
- Phase progress: ${JSON.stringify(phaseProgress)}
- Longest streak: ${streak.longest} days

Roadmap phases: Foundation (Python, DSA, SQL) → AI/ML + Cloud → Projects → Certifications → Job Prep.

Be direct, specific, and motivating but not cringe. Give concrete next actions. Think like a senior engineer who went from $60K to $400K. Keep responses under 150 words unless the question demands more depth.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          system: context,
          messages: [
            ...messages.filter(m => m.role !== "coach").map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
            { role: "user", content: userMsg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Connection issue. Check your API key.";
      setMessages(prev => [...prev, { role: "coach", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "coach", text: "API unavailable. Here's a direct insight: " + getCoachInsight() }]);
    }
    setLoading(false);
  };

  const suggestions = [
    "I missed 3 days, what should I do?",
    "Which skill should I focus on this week?",
    "How do I get to $300K in 18 months?",
    "What projects will make me stand out?",
    "How many hours per day do I need?",
  ];

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>AI Coach</h1>
          <p style={styles.pageSubtitle}>Context-aware career coaching based on your actual progress</p>
        </div>
      </div>

      {/* Status Cards */}
      <div style={styles.coachStats}>
        <CoachStatCard label="Streak" value={`${streak.current} days`} icon="🔥" color="#FDE68A" note={streak.current > 0 ? "Keep going" : "Restart today"} />
        <CoachStatCard label="Today" value={`${completionToday}%`} icon="◎" color="#6EE7B7" note={completionToday > 80 ? "Excellent" : completionToday > 40 ? "Good pace" : "Needs push"} />
        <CoachStatCard label="Active Phase" value={activePhase.replace("_", " ")} icon="◈" color="#93C5FD" note="On track" />
      </div>

      {/* Current Insight */}
      <div style={styles.coachInsightBox}>
        <div style={styles.coachInsightLabel}>Today's Insight</div>
        <div style={styles.coachInsightText}>{getCoachInsight()}</div>
      </div>

      {/* Chat */}
      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div key={i} style={{ ...styles.chatMsg, ...(m.role === "user" ? styles.chatMsgUser : styles.chatMsgCoach) }}>
            {m.role === "coach" && <div style={styles.chatCoachIcon}>◉</div>}
            <div style={{ ...styles.chatBubble, ...(m.role === "user" ? styles.chatBubbleUser : styles.chatBubbleCoach) }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.chatMsg, ...styles.chatMsgCoach }}>
            <div style={styles.chatCoachIcon}>◉</div>
            <div style={{ ...styles.chatBubble, ...styles.chatBubbleCoach, color: "#555" }}>thinking...</div>
          </div>
        )}
        <div ref={msgEnd} />
      </div>

      {/* Suggestions */}
      <div style={styles.suggestions}>
        {suggestions.map((s, i) => (
          <button key={i} style={styles.suggestionBtn} onClick={() => setInput(s)}>{s}</button>
        ))}
      </div>

      {/* Input */}
      <div style={styles.chatInput}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          style={styles.chatInputField}
          placeholder="Ask your coach anything..."
        />
        <button style={styles.chatSendBtn} onClick={sendMessage}>Send →</button>
      </div>
    </div>
  );
}

function CoachStatCard({ label, value, icon, color, note }) {
  return (
    <div style={{ ...styles.coachStatCard, borderColor: color + "30" }}>
      <div style={{ fontSize: 24 }}>{icon}</div>
      <div style={{ ...styles.coachStatVal, color }}>{value}</div>
      <div style={styles.coachStatLabel}>{label}</div>
      <div style={{ ...styles.coachStatNote, color: color + "aa" }}>{note}</div>
    </div>
  );
}

// ============================================================
// HELPERS
// ============================================================
function getTimeOfDay() {
  const h = new Date().getHours();
  return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
}

// ============================================================
// STYLES
// ============================================================
const styles = {
  root: { display: "flex", minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "'SF Pro Display', 'Helvetica Neue', system-ui, sans-serif", position: "relative", overflow: "hidden" },
  bg: { position: "fixed", inset: 0, background: "radial-gradient(ellipse at 20% 20%, #0f2010 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, #0d1a2e 0%, transparent 50%)", pointerEvents: "none", zIndex: 0 },
  bgGrid: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 },
  notif: { position: "fixed", top: 20, right: 20, zIndex: 100, padding: "10px 18px", borderRadius: 10, border: "1px solid", fontSize: 13, fontWeight: 500, backdropFilter: "blur(12px)" },
  sidebar: { width: 240, background: "rgba(12,12,12,0.95)", borderRight: "1px solid #1a1a1a", display: "flex", flexDirection: "column", padding: "24px 0", position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 10, backdropFilter: "blur(20px)" },
  sidebarLogo: { display: "flex", alignItems: "center", gap: 10, padding: "0 20px 24px", borderBottom: "1px solid #1a1a1a" },
  logoIcon: { fontSize: 28, color: "#6EE7B7" },
  logoText: { fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" },
  logoSub: { fontSize: 10, color: "#555", letterSpacing: "1px", textTransform: "uppercase" },
  levelBadge: { padding: "16px 20px", borderBottom: "1px solid #1a1a1a" },
  levelRow: { display: "flex", justifyContent: "space-between", marginBottom: 6 },
  levelLabel: { fontSize: 12, color: "#888", fontWeight: 600 },
  xpLabel: { fontSize: 12, color: "#6EE7B7", fontWeight: 600 },
  xpBar: { height: 4, background: "#1a1a1a", borderRadius: 4, overflow: "hidden", marginBottom: 4 },
  xpFill: { height: "100%", background: "linear-gradient(90deg, #6EE7B7, #93C5FD)", borderRadius: 4, transition: "width 0.5s ease" },
  xpNext: { fontSize: 10, color: "#444" },
  navList: { flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 },
  navItem: { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: "transparent", color: "#555", cursor: "pointer", fontSize: 13, fontWeight: 500, textAlign: "left", transition: "all 0.15s" },
  navItemActive: { background: "rgba(110,231,183,0.1)", color: "#6EE7B7" },
  navIcon: { fontSize: 14, width: 18, textAlign: "center" },
  sidebarBottom: { padding: "16px 20px", borderTop: "1px solid #1a1a1a" },
  streakCard: { textAlign: "center", marginBottom: 12 },
  streakNum: { fontSize: 32, fontWeight: 700, color: "#FDE68A", lineHeight: 1 },
  streakLabel: { fontSize: 11, color: "#555" },
  totalProg: {},
  totalProgLabel: { fontSize: 11, color: "#555", marginBottom: 4 },
  totalProgBar: { height: 3, background: "#1a1a1a", borderRadius: 3, overflow: "hidden", marginBottom: 3 },
  totalProgFill: { height: "100%", background: "linear-gradient(90deg, #6EE7B7, #93C5FD)", borderRadius: 3, transition: "width 0.5s" },
  totalProgPct: { fontSize: 11, color: "#444", textAlign: "right" },
  main: { marginLeft: 240, flex: 1, overflowY: "auto", position: "relative", zIndex: 1, minHeight: "100vh" },
  page: { padding: "32px 36px", maxWidth: 900, margin: "0 auto" },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 },
  pageTitle: { fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.5px" },
  pageSubtitle: { fontSize: 13, color: "#555", marginTop: 4 },
  headerStats: { display: "flex", gap: 8 },
  statPill: { padding: "8px 14px", borderRadius: 10, border: "1px solid", textAlign: "center" },
  statPillVal: { fontSize: 16, fontWeight: 700 },
  statPillLabel: { fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.5px" },
  todayBanner: { background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: 16, padding: "24px 28px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center" },
  todayBannerLeft: { flex: 1 },
  todayBannerTitle: { fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 4 },
  todayBannerSub: { fontSize: 13, color: "#555", marginBottom: 12 },
  todayProgressBar: { height: 6, background: "#1a1a1a", borderRadius: 6, overflow: "hidden", maxWidth: 400 },
  todayProgressFill: { height: "100%", background: "linear-gradient(90deg, #6EE7B7, #93C5FD)", borderRadius: 6, transition: "width 0.5s" },
  todayBannerRight: {},
  bigPercent: { fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 },
  sectionTitle: { fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12, marginTop: 28, fontWeight: 600 },
  taskGrid: { display: "flex", flexDirection: "column", gap: 8 },
  taskCard: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: 10, cursor: "pointer", transition: "all 0.15s" },
  taskCardDone: { opacity: 0.6 },
  taskCardLeft: { display: "flex", alignItems: "center", gap: 12 },
  taskCheck: { width: 18, height: 18, borderRadius: 5, border: "2px solid #333", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" },
  taskCheckDone: { background: "#6EE7B7", borderColor: "#6EE7B7" },
  taskTitle: { fontSize: 13, color: "#ddd", fontWeight: 500 },
  taskMeta: { fontSize: 11, color: "#555", marginTop: 2, display: "flex", gap: 8 },
  taskTag: { fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600, letterSpacing: "0.5px" },
  phaseGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 },
  phaseCard: { background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: 12, padding: "16px 14px", cursor: "pointer", transition: "all 0.2s" },
  phaseCardActive: { background: "rgba(255,255,255,0.05)" },
  phaseCardHeader: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  phaseNum: { fontSize: 20, fontWeight: 700 },
  phasePct: { fontSize: 14, fontWeight: 700 },
  phaseLabel: { fontSize: 11, color: "#888", marginBottom: 8, lineHeight: 1.3 },
  phaseBar: { height: 3, background: "#1a1a1a", borderRadius: 3, overflow: "hidden", marginTop: 8 },
  phaseFill: { height: "100%", borderRadius: 3, transition: "width 0.5s" },
  activeChip: { fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600, letterSpacing: "0.5px", display: "inline-block", marginTop: 6 },
  coachBanner: { display: "flex", gap: 16, padding: "20px 24px", background: "rgba(196,181,253,0.05)", border: "1px solid rgba(196,181,253,0.15)", borderRadius: 12, marginTop: 28 },
  coachIcon: { fontSize: 24, color: "#C4B5FD", flexShrink: 0 },
  coachLabel: { fontSize: 10, color: "#C4B5FD", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 },
  coachText: { fontSize: 13, color: "#bbb", lineHeight: 1.6 },
  // Daily
  phaseTabs: { display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" },
  phaseTab: { padding: "6px 14px", border: "1px solid #1a1a1a", borderRadius: 8, background: "transparent", color: "#555", cursor: "pointer", fontSize: 12, fontWeight: 500, transition: "all 0.15s" },
  phaseTabActive: { background: "rgba(110,231,183,0.1)", color: "#6EE7B7", borderColor: "rgba(110,231,183,0.3)" },
  timeSummary: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 },
  timeStat: { background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: 10, padding: "16px", textAlign: "center" },
  timeVal: { fontSize: 24, fontWeight: 700, color: "#fff" },
  timeLabel: { fontSize: 11, color: "#555", marginTop: 4 },
  fullTask: { background: "rgba(255,255,255,0.03)", border: "1px solid", borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" },
  fullTaskMain: { display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", cursor: "pointer" },
  heatmap: { display: "flex", gap: 12, alignItems: "flex-end", padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid #1a1a1a", marginBottom: 24 },
  heatDay: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  heatBar: { width: "100%", maxWidth: 40, borderRadius: 3, minHeight: 4, transition: "height 0.3s" },
  heatLabel: { fontSize: 11, color: "#555" },
  heatPct: { fontSize: 10, color: "#444" },
  notesArea: { width: "100%", minHeight: 100, background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: 10, padding: "14px 16px", color: "#ddd", fontSize: 13, lineHeight: 1.6, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" },
  // Roadmap
  roadmapTimeline: { display: "flex", flexDirection: "column", gap: 12 },
  roadmapCard: { background: "rgba(255,255,255,0.02)", border: "1px solid", borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s" },
  roadmapCardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", cursor: "pointer" },
  roadmapLeft: { display: "flex", alignItems: "center", gap: 14 },
  phaseIcon: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 },
  roadmapTitle: { fontSize: 16, fontWeight: 600, color: "#fff" },
  roadmapSub: { fontSize: 12, color: "#555", marginTop: 2 },
  roadmapRight: { display: "flex", alignItems: "center" },
  roadmapProgressRow: { padding: "0 24px 16px" },
  roadmapExpanded: { padding: "0 24px 24px", borderTop: "1px solid #1a1a1a" },
  progressAdjust: { display: "flex", alignItems: "center", gap: 12, padding: "16px 0", borderBottom: "1px solid #111", marginBottom: 16 },
  slider: { flex: 1, accentColor: "#6EE7B7" },
  activateBtn: { padding: "6px 14px", borderRadius: 8, border: "1px solid", cursor: "pointer", fontSize: 12, fontWeight: 600 },
  topicCard: { background: "rgba(255,255,255,0.02)", border: "1px solid #151515", borderRadius: 10, marginBottom: 8, overflow: "hidden" },
  topicHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", cursor: "pointer" },
  topicTitle: { fontSize: 13, fontWeight: 600 },
  topicBody: { padding: "0 16px 16px" },
  topicSection: { marginTop: 12 },
  topicSectionLabel: { fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 },
  subtopicList: { display: "flex", flexDirection: "column", gap: 4 },
  subtopicItem: { fontSize: 12, color: "#888", lineHeight: 1.5 },
  milestoneBox: { padding: "10px 14px", borderRadius: 8, border: "1px solid", marginTop: 12, fontSize: 12 },
  // Projects
  projectCard: { background: "rgba(255,255,255,0.02)", border: "1px solid", borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s" },
  projectHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "20px 24px", cursor: "pointer" },
  projectLeft: { display: "flex", gap: 16, alignItems: "flex-start" },
  projectNum: { fontSize: 28, fontWeight: 800, lineHeight: 1, minWidth: 40 },
  projectTitle: { fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 },
  projectStack: { display: "flex", gap: 6, flexWrap: "wrap" },
  stackTag: { fontSize: 10, padding: "3px 8px", borderRadius: 4, fontWeight: 600 },
  projectBody: { padding: "0 24px 24px", borderTop: "1px solid #111" },
  whyBox: { padding: "12px 16px", borderRadius: 10, border: "1px solid", margin: "16px 0", fontSize: 13, lineHeight: 1.6 },
  stepTabs: { display: "flex", gap: 6, marginBottom: 16 },
  stepTab: { padding: "7px 14px", border: "1px solid #1a1a1a", borderRadius: 8, background: "transparent", color: "#555", cursor: "pointer", fontSize: 12, fontWeight: 500 },
  stepTabActive: { background: "rgba(255,255,255,0.05)" },
  stepList: { display: "flex", flexDirection: "column", gap: 10 },
  stepItem: { display: "flex", gap: 10, alignItems: "flex-start" },
  stepDot: { width: 6, height: 6, borderRadius: "50%", marginTop: 6, flexShrink: 0 },
  stepText: { fontSize: 13, color: "#aaa", lineHeight: 1.5 },
  // Skills
  skillGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 },
  skillCard: { background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: 12, padding: "16px" },
  skillCardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  skillName: { fontSize: 14, fontWeight: 600, color: "#ddd" },
  skillLevel: { fontSize: 11, fontWeight: 600 },
  skillBarBg: { height: 6, background: "#111", borderRadius: 6, overflow: "hidden", marginBottom: 10 },
  skillBarFill: { height: "100%", borderRadius: 6, transition: "width 0.5s" },
  skillCardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  skillBtns: { display: "flex", gap: 4 },
  skillBtn: { width: 28, height: 28, borderRadius: 6, border: "1px solid #1a1a1a", background: "rgba(255,255,255,0.05)", color: "#888", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" },
  // Coach
  coachStats: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 },
  coachStatCard: { background: "rgba(255,255,255,0.03)", border: "1px solid", borderRadius: 12, padding: "20px 16px", textAlign: "center" },
  coachStatVal: { fontSize: 22, fontWeight: 700, marginTop: 8, marginBottom: 2 },
  coachStatLabel: { fontSize: 12, color: "#555" },
  coachStatNote: { fontSize: 10, marginTop: 4 },
  coachInsightBox: { background: "rgba(196,181,253,0.05)", border: "1px solid rgba(196,181,253,0.15)", borderRadius: 12, padding: "18px 20px", marginBottom: 20 },
  coachInsightLabel: { fontSize: 10, color: "#C4B5FD", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 },
  coachInsightText: { fontSize: 14, color: "#bbb", lineHeight: 1.7 },
  chatBox: { background: "rgba(255,255,255,0.02)", border: "1px solid #1a1a1a", borderRadius: 12, padding: "16px", minHeight: 280, maxHeight: 360, overflowY: "auto", marginBottom: 12, display: "flex", flexDirection: "column", gap: 12 },
  chatMsg: { display: "flex", gap: 10, alignItems: "flex-start" },
  chatMsgUser: { justifyContent: "flex-end" },
  chatMsgCoach: { justifyContent: "flex-start" },
  chatCoachIcon: { color: "#C4B5FD", fontSize: 16, marginTop: 6, flexShrink: 0 },
  chatBubble: { padding: "10px 14px", borderRadius: 10, maxWidth: "80%", fontSize: 13, lineHeight: 1.6 },
  chatBubbleCoach: { background: "rgba(255,255,255,0.04)", color: "#ccc", borderRadius: "4px 12px 12px 12px" },
  chatBubbleUser: { background: "rgba(110,231,183,0.12)", color: "#e0e0e0", borderRadius: "12px 4px 12px 12px" },
  suggestions: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 },
  suggestionBtn: { padding: "6px 12px", border: "1px solid #1e1e1e", borderRadius: 8, background: "rgba(255,255,255,0.03)", color: "#666", cursor: "pointer", fontSize: 11, transition: "all 0.15s" },
  chatInput: { display: "flex", gap: 8 },
  chatInputField: { flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid #1a1a1a", borderRadius: 10, padding: "12px 16px", color: "#ddd", fontSize: 13, outline: "none", fontFamily: "inherit" },
  chatSendBtn: { padding: "12px 20px", background: "rgba(110,231,183,0.15)", border: "1px solid rgba(110,231,183,0.3)", borderRadius: 10, color: "#6EE7B7", cursor: "pointer", fontSize: 13, fontWeight: 600 },
};