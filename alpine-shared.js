/**
 * Alpine Property Group - Shared Data Model & Utilities
 * LocalStorage-based data persistence for all Alpine tools
 */

const AlpineData = {
  // Storage keys
  KEYS: {
    PROJECTS: 'alpine_projects',
    BUDGETS: 'alpine_budgets',
    SCHEDULES: 'alpine_schedules',
    PROPERTIES: 'alpine_properties',
    DOCUMENTS: 'alpine_documents',
    SETTINGS: 'alpine_settings'
  },

  // Project stages for pipeline
  STAGES: {
    LEAD: 'Lead',
    UNDERWRITING: 'Underwriting',
    ACQUISITION: 'Acquisition',
    DEVELOPMENT: 'Development',
    CONSTRUCTION: 'Construction',
    LEASE_UP: 'Lease-Up',
    STABILIZED: 'Stabilized',
    EXIT: 'Exit'
  },

  // Initialize storage
  init() {
    Object.values(this.KEYS).forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify([]));
      }
    });
  },

  // Generic CRUD operations
  getAll(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      console.error('Error reading from storage:', e);
      return [];
    }
  },

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error saving to storage:', e);
      return false;
    }
  },

  // Project operations
  getProjects() {
    return this.getAll(this.KEYS.PROJECTS);
  },

  saveProjects(projects) {
    return this.save(this.KEYS.PROJECTS, projects);
  },

  addProject(project) {
    const projects = this.getProjects();
    const newProject = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...project
    };
    projects.push(newProject);
    this.saveProjects(projects);
    return newProject;
  },

  updateProject(id, updates) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates, updatedAt: new Date().toISOString() };
      this.saveProjects(projects);
      return projects[index];
    }
    return null;
  },

  deleteProject(id) {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    return this.saveProjects(filtered);
  },

  getProject(id) {
    return this.getProjects().find(p => p.id === id);
  },

  // Budget operations
  getBudgets() {
    return this.getAll(this.KEYS.BUDGETS);
  },

  saveBudgets(budgets) {
    return this.save(this.KEYS.BUDGETS, budgets);
  },

  addBudget(budget) {
    const budgets = this.getBudgets();
    const newBudget = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...budget
    };
    budgets.push(newBudget);
    this.saveBudgets(budgets);
    return newBudget;
  },

  updateBudget(id, updates) {
    const budgets = this.getBudgets();
    const index = budgets.findIndex(b => b.id === id);
    if (index !== -1) {
      budgets[index] = { ...budgets[index], ...updates };
      this.saveBudgets(budgets);
      return budgets[index];
    }
    return null;
  },

  // Utility functions
  formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  },

  formatPercent(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value || 0);
  },

  formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  // Export all data
  exportData() {
    const data = {};
    Object.entries(this.KEYS).forEach(([name, key]) => {
      data[name.toLowerCase()] = this.getAll(key);
    });
    return data;
  },

  // Import data
  importData(data) {
    Object.entries(data).forEach(([name, value]) => {
      const key = this.KEYS[name.toUpperCase()];
      if (key) {
        this.save(key, value);
      }
    });
  },

  // Clear all data
  clearAll() {
    if (confirm('⚠️ This will delete ALL Alpine data. Are you sure?')) {
      Object.values(this.KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      this.init();
      return true;
    }
    return false;
  }
};

// Initialize on load
AlpineData.init();
