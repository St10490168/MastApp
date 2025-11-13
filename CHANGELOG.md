# Changelog

## Version 2.0.0 - Major Refactor (15 January 2025)

### Added Features
- **Average Price Display**: Home screen now shows average prices broken down by course (Starters, Mains, Desserts) and overall average
- **Separate Management Screen**: Created dedicated screen for adding and removing menu items
- **Filter Screen**: New screen allows guests to filter menu items by course type
- **Remove Menu Items**: Added ability to remove items from the menu with confirmation dialogs
- **Input Validation**: Comprehensive form validation with clear error messages
- **Mobile Optimization**: Enhanced UI for Expo Go compatibility

### Code Improvements
- **Single File Architecture**: Consolidated all components into App.tsx for Expo compatibility
- **Simplified Comments**: Clear, concise documentation for all key functions
- **Error Handling**: Robust validation and user feedback systems
- **State Management**: Efficient React hooks implementation
- **Clean Navigation**: Simple screen-based navigation system

### Technical Enhancements
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Data Persistence**: React state management maintains data across navigation
- **Responsive Design**: Mobile-first UI with proper touch targets
- **Performance**: Optimized rendering with proper key extraction
- **Accessibility**: SafeAreaView and StatusBar implementation

### User Experience Improvements
- **Clear Navigation**: Intuitive back buttons and screen flow
- **Visual Feedback**: Confirmation dialogs and success messages
- **Form Validation**: Prevents invalid submissions with helpful error messages
- **Course Filtering**: Easy filtering with visual active state indicators
- **Professional Design**: Consistent color scheme and typography

### Code Quality
- **Naming Standards**: Consistent camelCase/PascalCase conventions
- **No Redundancy**: Clean, efficient implementation without unused code
- **Proper Documentation**: Key functions commented with purpose and logic
- **Academic Integrity**: Original implementation with proper AI disclosure

### Breaking Changes
- Moved from modular file structure to single-file implementation
- Navigation changed from component-based to screen state management
- All utility functions integrated into main application file

### Testing & Compatibility
- **Expo Go Tested**: Confirmed working on mobile devices
- **Cross-Platform**: Compatible with iOS and Android via Expo
- **Web Testing**: Works in Expo Snack for browser testing
- **Error-Free**: No runtime errors or module resolution issues

### Documentation Updates
- **Comprehensive README**: Complete technical documentation
- **Academic Integrity**: Full checklist with AI usage disclosure
- **Code Comments**: Detailed explanations for CRUD operations
- **Reference List**: Proper Harvard: Anglia (IIE) formatting

## Version 1.0.0 - Initial Implementation

### Initial Features
- Basic menu item display
- Simple add/remove functionality
- Basic React Native structure

### Technical Foundation
- React Native with TypeScript
- Expo framework setup
- Basic state management
- Initial UI components