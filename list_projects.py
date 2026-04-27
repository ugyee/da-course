
# Let's read the projects.ts file and parse the projects array
with open('src/data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find where the projects array starts
projects_start = content.find('export const projects: Project[] = [')
if projects_start == -1:
    print("Could not find projects array")
    exit()

# Let's just extract the projects part and use some simple parsing
# We'll look for id: X and title: "..." pairs
import re

# Find all id and title pairs in the projects part
projects_part = content[projects_start:]

# Let's find all matches of id: X followed by title: "..."
pattern = r'id:\s*(\d+),\s*title:\s*"([^"]+)"'
matches = list(re.finditer(pattern, projects_part))

print("Current projects in file:")
for i, match in enumerate(matches):
    project_id = match.group(1)
    project_title = match.group(2)
    print(f"  {i+1}. id: {project_id}, title: {project_title}")

print(f"Total projects: {len(matches)}")
