from scholarly import scholarly
import json
import os

def update_scholar_stats():
  try:
      # Replace with your Google Scholar ID
      SCHOLAR_ID = 'W-Ij6voAAAAJ&hl'
            print(f"Attempting to fetch data for Scholar ID: {SCHOLAR_ID}")
      # Search for the author
      author = scholarly.search_author_id(SCHOLAR_ID)
            print("Found author, filling data...")
      author_data = scholarly.fill(author)
            print("Author data retrieved successfully")
      stats = {
          'citations': author_data['citedby'],
          'publications': len(author_data['publications']),
          'h_index': author_data['hindex'],
          'i10_index': author_data['i10index'],
          'last_updated': author_data['updated']
      }
            print(f"Processed stats: {stats}")
      # Save to the root directory
      os.makedirs('assets/data', exist_ok=True)
      with open('assets/data/scholar_stats.json', 'w') as f:
          json.dump(stats, f)
                print(f"Successfully wrote stats to {output_path}")
  except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
      raise e

if __name__ == "__main__":
  updateScholarStats()