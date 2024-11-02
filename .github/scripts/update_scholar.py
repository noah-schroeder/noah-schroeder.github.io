from scholarly import scholarly
import json
import os

def update_scholar_stats():
  try:
      # Replace with your Google Scholar ID
      SCHOLAR_ID = 'W-Ij6voAAAAJ&hl'
      # Search for the author
      author = scholarly.search_author_id(SCHOLAR_ID)
      author_data = scholarly.fill(author)
      stats = {
          'citations': author_data['citedby'],
          'publications': len(author_data['publications']),
          'h_index': author_data['hindex'],
          'i10_index': author_data['i10index'],
          'last_updated': author_data['updated']
      }
      # Save to the root directory
      os.makedirs('assets/data', exist_ok=True)
      with open('assets/data/scholar_stats.json', 'w') as f:
          json.dump(stats, f)
  except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)

if __name__ == "__main__":
  update_scholar_stats()