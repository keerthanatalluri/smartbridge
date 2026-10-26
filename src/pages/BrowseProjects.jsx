import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ProjectCard } from '../components/cards/ProjectCard';
import { CATEGORIES, POPULAR_SKILLS } from '../data/sampleData';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  PlusCircle,
  Briefcase
} from 'lucide-react';

export const BrowseProjects = () => {
  const { projects } = useData();
  const { role } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from URL search params if present
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Categories');
  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('skill') || '');
  const [scopeFilter, setScopeFilter] = useState('All');
  const [budgetTypeFilter, setBudgetTypeFilter] = useState('All');
  const [maxBudget, setMaxBudget] = useState(6000);
  const [sortBy, setSortBy] = useState('newest');

  // Sync state if URL query params change
  useEffect(() => {
    const qSearch = searchParams.get('search');
    const qCat = searchParams.get('category');
    const qSkill = searchParams.get('skill');
    if (qSearch !== null) setSearch(qSearch);
    if (qCat !== null) setSelectedCategory(qCat);
    if (qSkill !== null) setSelectedSkill(qSkill);
  }, [searchParams]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All Categories');
    setSelectedSkill('');
    setScopeFilter('All');
    setBudgetTypeFilter('All');
    setMaxBudget(6000);
    setSortBy('newest');
    setSearchParams({});
  };

  // Filter & Sort logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Keyword matching across title, description, skills
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.description.toLowerCase().includes(query);
        const matchesSkills = project.requiredSkills?.some(s => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesSkills) return false;
      }

      // Category filter
      if (selectedCategory && selectedCategory !== 'All Categories') {
        if (project.category !== selectedCategory) return false;
      }

      // Skill filter
      if (selectedSkill) {
        if (!project.requiredSkills?.includes(selectedSkill)) return false;
      }

      // Scope level filter
      if (scopeFilter !== 'All') {
        if (project.scopeLevel !== scopeFilter) return false;
      }

      // Budget type filter
      if (budgetTypeFilter !== 'All') {
        if (project.budgetType !== budgetTypeFilter) return false;
      }

      // Max budget filter
      if (project.budget > maxBudget) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'highest-budget') {
        return b.budget - a.budget;
      }
      if (sortBy === 'lowest-budget') {
        return a.budget - b.budget;
      }
      if (sortBy === 'proposals') {
        return (b.proposalsCount || 0) - (a.proposalsCount || 0);
      }
      return 0;
    });
  }, [projects, search, selectedCategory, selectedSkill, scopeFilter, budgetTypeFilter, maxBudget, sortBy]);

  return (
    <div className="max-w-7xl" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Marketplace Projects
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
            Browse open opportunities and submit proposals with custom milestone breakdowns.
          </p>
        </div>

        {role === 'client' && (
          <Link to="/post-project" className="btn btn-primary">
            <PlusCircle size={18} /> Post New Project
          </Link>
        )}
      </div>

      {/* Main Grid: Sidebar + Project Feed */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '2rem',
        alignItems: 'start'
      }} className="lg-grid-cols-1">
        {/* Filter Sidebar */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--slate-100)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
              <Filter size={18} color="var(--primary-600)" /> Filter Projects
            </div>
            <button
              onClick={handleResetFilters}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--slate-400)',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
              title="Reset all filters"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* Keyword Search */}
          <div className="form-group">
            <label className="form-label" htmlFor="filter-search">Keyword Search</label>
            <div style={{ position: 'relative' }}>
              <input
                id="filter-search"
                type="text"
                className="form-input"
                placeholder="Title, description, skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '2.25rem' }}
              />
              <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }}>
                <Search size={16} />
              </div>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--slate-400)',
                    cursor: 'pointer'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label className="form-label" htmlFor="filter-category">Category</label>
            <select
              id="filter-category"
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Budget Range Slider */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label className="form-label" htmlFor="filter-max-budget" style={{ margin: 0 }}>Max Budget</label>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary-600)' }}>
                ${maxBudget.toLocaleString()}
              </span>
            </div>
            <input
              id="filter-max-budget"
              type="range"
              min="500"
              max="10000"
              step="250"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* Budget Type Toggle */}
          <div className="form-group">
            <label className="form-label">Pricing Model</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['All', 'Fixed', 'Hourly'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setBudgetTypeFilter(type)}
                  style={{
                    flex: 1,
                    padding: '0.4rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    border: budgetTypeFilter === type ? '1px solid var(--primary-600)' : '1px solid var(--slate-200)',
                    backgroundColor: budgetTypeFilter === type ? 'var(--primary-50)' : '#ffffff',
                    color: budgetTypeFilter === type ? 'var(--primary-700)' : 'var(--slate-600)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Scope */}
          <div className="form-group">
            <label className="form-label">Experience Scope</label>
            <select
              className="form-select"
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value)}
            >
              <option value="All">All Scope Levels</option>
              <option value="Entry">Entry Level</option>
              <option value="Intermediate">Intermediate Level</option>
              <option value="Expert">Expert Level</option>
            </select>
          </div>

          {/* Skill Tag Chips */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Filter by Skill</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {POPULAR_SKILLS.map(skill => {
                const isSelected = selectedSkill === skill;
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => setSelectedSkill(isSelected ? '' : skill)}
                    style={{
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--primary-600)' : '1px solid var(--slate-200)',
                      backgroundColor: isSelected ? 'var(--primary-600)' : 'var(--slate-100)',
                      color: isSelected ? '#ffffff' : 'var(--slate-700)'
                    }}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Project Feed */}
        <div>
          {/* Feed Toolbar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            padding: '0.875rem 1.25rem',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ fontSize: '0.9375rem', color: 'var(--slate-600)' }}>
              Showing <strong style={{ color: 'var(--slate-900)' }}>{filteredProjects.length}</strong> matching projects
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="feed-sort-by" style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                Sort by:
              </label>
              <select
                id="feed-sort-by"
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8125rem', width: 'auto' }}
              >
                <option value="newest">Newest First</option>
                <option value="highest-budget">Highest Budget</option>
                <option value="lowest-budget">Lowest Budget</option>
                <option value="proposals">Most Proposals</option>
              </select>
            </div>
          </div>

          {/* Project List */}
          {filteredProjects.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--slate-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: 'var(--slate-400)'
              }}>
                <Briefcase size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                No projects found matching your criteria
              </h3>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.9375rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                Try adjusting or resetting your filter criteria, or browse through all active categories.
              </p>
              <button onClick={handleResetFilters} className="btn btn-primary">
                <RotateCcw size={16} /> Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

