from scholarly import scholarly
import json
from datetime import datetime
import os
import sys

def update_scholar_stats():
  try:
      # Replace with your Google Scholar profile ID
      author = scholarly.search_author_id('W-Ij6voAAAAJ')
      author = scholarly.fill(author)
      
      # Get basic stats
      stats = {
          'citations': author['citedby'],
          'h_index': author['hindex'],
          'publications': len(author['publications']),
          'last_updated': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
          'recent_publications': []
      }
      
      # Get 3 most recent publications
      for i, pub in enumerate(author['publications'][:3]):
          filled_pub = scholarly.fill(pub)
          pub_data = {
              'title': filled_pub['bib']['title'],
              'year': filled_pub['bib'].get('pub_year', 'N/A'),
              'journal': filled_pub['bib'].get('journal', 'N/A'),
              'url': filled_pub.get('pub_url', '#')
          }
          stats['recent_publications'].append(pub_data)
      
      # Create data directory if it doesn't exist
      os.makedirs('assets/data', exist_ok=True)
      
      # Save to JSON using absolute path from repository root
      json_path = os.path.join(os.getcwd(), 'assets/data/scholar_stats.json')
      with open(json_path, 'w', encoding='utf-8') as f:
          json.dump(stats, f, ensure_ascii=False, indent=2)
          
      print("Successfully updated scholar stats and publications")
      print(f"JSON file saved to: {json_path}")
      
  except Exception as e:
      print(f"Error updating scholar stats: {str(e)}")
      raise e

if __name__ == "__main__":
  update_scholar_stats()