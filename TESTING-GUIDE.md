# Alpine Toolkit - Testing Guide 🧪

## Quick Start Testing

### 1. Open the Toolkit

```bash
cd alpine-tools
open index.html
# or
python3 -m http.server 8000
# then visit http://localhost:8000
```

### 2. Login
- **Email**: `steve@alpinepropertygroupllc.com`
- **Password**: `Alpine109!`

---

## 🎯 Priority Tests (5 minutes)

### Test 1: Visual Inspection
**Expected:** Clean black/white/grey design, zero blue colors

1. Open `index.html`
2. **Check:** No blue colors anywhere
3. **Check:** Clean white background
4. **Check:** Grey cards with minimal shadows
5. **Check:** Black headers and accent elements

✅ Pass if: No blue visible, professional and minimal appearance

---

### Test 2: Budget Tracker - Inline Editing
**Expected:** Click any cell to edit values

1. Navigate to **Budget vs Actual (COGS)**
2. Select a project from dropdown
3. Click on any line item name → Should enter edit mode
4. Type new name, press Enter → Should save
5. Click on estimated amount → Should enter edit mode
6. Change value, press Enter → Should save and update totals
7. Press Escape while editing → Should cancel

✅ Pass if: All cells editable, Enter saves, Escape cancels, totals update

---

### Test 3: Add Line Item
**Expected:** Can add new line items under any subcategory

1. Expand a subcategory (e.g., "Electrical")
2. Click **"+ Add Line Item"** button
3. Enter item name in prompt (e.g., "New circuit")
4. **Check:** Item appears in table with $0 values
5. Edit the new item's values
6. **Check:** Values save correctly

✅ Pass if: New item appears, is editable, and persists

---

### Test 4: Delete Line Item
**Expected:** Can delete items with confirmation

1. Hover over any line item
2. **Check:** Delete button (🗑️) appears on hover
3. Click delete button
4. **Check:** Confirmation modal appears
5. Click "Delete" → Item removed
6. Try another item, click "Cancel" → Item remains

✅ Pass if: Delete works with confirmation, cancel preserves item

---

### Test 5: Data Persistence
**Expected:** All changes persist after page refresh

1. Make several changes:
   - Edit item name
   - Change estimated/actual values
   - Add new line item
   - Delete an item
2. **Refresh the page** (Cmd+R / Ctrl+R)
3. **Check:** All changes are still there

✅ Pass if: All changes persist across refresh

---

## 🔧 Advanced Tests (10 minutes)

### Test 6: Hierarchical Structure

1. **Add Subcategory:**
   - Click "+ Add Subcategory" on a category
   - Enter name, confirm
   - **Check:** New subcategory appears

2. **Expand/Collapse:**
   - Click category name → Should toggle
   - Click subcategory name → Should toggle
   - **Check:** Arrow rotates when expanded

3. **Delete Subcategory:**
   - Add a few items to a subcategory
   - Hover over subcategory → Delete button appears
   - Click delete
   - **Check:** Warning about child items
   - Confirm → All items removed

✅ Pass if: Full hierarchy works, expand/collapse smooth, delete warns

---

### Test 7: Notes System

1. Hover over any line item
2. Click notes button (📝)
3. Enter notes (e.g., "Vendor: ABC Electric")
4. Confirm
5. **Check:** Black dot indicator appears next to item name
6. Hover over dot → **Check:** Tooltip shows notes

✅ Pass if: Notes save, indicator appears, tooltip works

---

### Test 8: Mobile Responsive

1. Resize browser window to mobile size (< 768px)
2. **Check:** Stats cards become 2 columns
3. **Check:** Table scrolls horizontally if needed
4. **Check:** Buttons remain accessible
5. **Check:** All features still work

✅ Pass if: Layout adapts, all features accessible

---

### Test 9: Multi-Project Support

1. Create/select different projects
2. Make changes in Project A
3. Switch to Project B
4. **Check:** Different budget data loads
5. Switch back to Project A
6. **Check:** Previous changes are still there

✅ Pass if: Each project has independent budget data

---

### Test 10: Login/Logout Flow

1. Click "Logout" button
2. **Check:** Redirects to login page
3. Try wrong password → **Check:** Error message
4. Try unauthorized email → **Check:** Error message
5. Login with correct credentials
6. **Check:** Redirects to main page
7. **Check:** Black/white/grey theme on login page

✅ Pass if: Auth works, errors display, theme consistent

---

## 🎨 Design Quality Tests

### Visual Consistency

**Check each page for:**
- [ ] Zero blue colors
- [ ] Clean black/white/grey palette
- [ ] Consistent shadows (subtle, minimal)
- [ ] Proper spacing and padding
- [ ] Readable typography
- [ ] Professional appearance

### Interaction Quality

**Check all interactions for:**
- [ ] Smooth transitions (150-300ms)
- [ ] Hover states work correctly
- [ ] Focus states visible (black outline)
- [ ] Click feedback clear
- [ ] No laggy animations
- [ ] Responsive feel

### Typography

**Check text for:**
- [ ] Headers: Bold, black (#1A1A1A)
- [ ] Body: Medium grey (#2D3748)
- [ ] Labels: Darker grey (#4A5568)
- [ ] Proper hierarchy (size and weight)
- [ ] Good line-height (1.5-1.6)

---

## ⚠️ Known Issues to Test

1. **Large datasets:** Add 50+ line items → Check performance
2. **Long names:** Very long item names → Check overflow handling
3. **Decimal values:** Test $0.50, $1234.56 → Check formatting
4. **Negative values:** Enter negative actual → Check variance display
5. **Empty project:** Select project with no data → Check initialization

---

## 📊 Performance Benchmarks

**Target Metrics:**
- Page load: < 2 seconds
- Inline edit activate: < 100ms
- Save operation: < 50ms
- Delete operation: < 100ms
- Expand/collapse: < 150ms

**Test with Chrome DevTools:**
1. Open DevTools → Performance tab
2. Record interaction
3. Check timing metrics

---

## ✅ Final Checklist

Before declaring success:

- [ ] All priority tests pass
- [ ] No blue colors visible anywhere
- [ ] All interactive features work
- [ ] Data persists correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Professional appearance
- [ ] Fast and smooth
- [ ] Login/logout works
- [ ] Multi-project support works

---

## 🐛 Bug Report Template

If you find issues:

```markdown
**Issue:** [Brief description]
**Steps to reproduce:**
1. 
2. 
3. 

**Expected:** [What should happen]
**Actual:** [What actually happens]

**Browser:** Chrome 120 / Firefox 121 / Safari 17
**Screenshot:** [If applicable]
```

---

## 🚀 Success Criteria

**This rebuild is successful if:**

1. ✅ Full interactivity works (edit, delete, add)
2. ✅ Zero blue colors (100% black/white/grey)
3. ✅ Looks professional (Linear/Notion/Stripe quality)
4. ✅ Data persists across refreshes
5. ✅ Fast and responsive (no lag)
6. ✅ Mobile-friendly
7. ✅ Clean, minimal design
8. ✅ All features work as specified

**Quality bar:** Should feel like a $100k enterprise tool. 🎯

---

## 📞 Support

If you encounter any issues or need clarification:

1. Check console for errors (F12 → Console)
2. Try clearing localStorage and refreshing
3. Test in incognito mode
4. Verify all files are properly saved

Happy testing! 🧪✨
