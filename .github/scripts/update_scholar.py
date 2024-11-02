from scholarly import scholarly
import json
import os
import sys
from datetime import datetime

def update_scholar_stats():
  try:
      # Your Google Scholar ID
      SCHOLAR_ID = 'W-Ij6voAAAAJ'
      
      print(f"Attempting to fetch data for Scholar ID: {SCHOLAR_ID}")
      
      # Search for the author
      author = scholarly.search_author_id(SCHOLAR_ID)
      print("Found author, filling data...")
      
      author_data = scholarly.fill(author)
      print("Author data retrieved successfully")
      
      stats = {
          'citations': author_data.get('citedby', 0),
          'publications': len(author_data.get('publications', [])),
          'h_index': author_data.get('hindex', 0),
          'i10_index': author_data.get('i10index', 0),
          'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
      }
      
      print(f"Processed stats: {stats}")
      
      # Save to the root directory
      os.makedirs('assets/data', exist_ok=True)
      output_path = 'assets/data/scholar_stats.json'
      
      with open(output_path, 'w') as f:
          json.dump(stats, f, indent=2)
      
      print(f"Successfully wrote stats to {output_path}")
          
  except Exception as e:
      print(f"Error: {str(e)}", file=sys.stderr)
      raise e

if __name__ == "__main__":
  update_scholar_stats()