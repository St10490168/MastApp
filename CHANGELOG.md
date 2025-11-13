# Changelog

## Version 2.0.0 - Major Refactor

### Added Features
- **Average Price Display**: Home screen now shows average prices broken down by course (Starters, Mains, Desserts) and overall average
- **Separate Management Screen**: Created dedicated screen for adding and removing menu items
- **Filter Screen**: New screen allows guests to filter menu items by course type
- **Remove Menu Items**: Added ability to remove items from the menu with confirmation
- **Modular Architecture**: Refactored codebase into multiple files and reusable components

### Code Improvements
- **Separation of Concerns**: Split monolithic App.tsx into multiple focused components
- **Reusable Components**: Created MenuItemCard component used across screens
- **Utility Functions**: Added helper functions for price calculations and filtering
- **Type Safety**: Centralized TypeScript interfaces and types
- **Better Navigation**: Implemented simple screen-based navigation system

### File Structure Changes
```
src/
├── components/
│   └── MenuItemCard.tsx     # Reusable menu item display component
├── screens/
│   ├── HomeScreen.tsx       # Main menu display with averages
│   ├── ManageMenuScreen.tsx # Add/remove menu items
│   └── FilterMenuScreen.tsx # Filter by course
└── utils/
    ├── types.ts            # TypeScript interfaces
    └── menuUtils.ts        # Helper functions
```

### Technical Improvements
- **State Management**: Centralized menu state in main App component
- **Function Extraction**: Moved calculation logic to utility functions
- **Component Reusability**: MenuItemCard component handles both display and removal
- **Consistent Styling**: Maintained design consistency across all screens
- **Performance**: Optimized rendering with proper key extraction

### User Experience Enhancements
- **Clear Navigation**: Easy back buttons and intuitive flow
- **Visual Feedback**: Course filtering with active state indicators
- **Data Persistence**: Menu items stored in array as required
- **Error Handling**: Form validation for adding new items
- **Responsive Design**: Consistent layout across different screen sizes

### Breaking Changes
- Moved add/remove functionality from home screen to dedicated management screen
- Home screen now focuses on displaying complete menu and averages
- Navigation changed from form toggles to screen-based system