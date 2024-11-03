from scholarly import scholarly
import json
from datetime import datetime
import os
import sys

def update_scholar_stats():
  try:
      author = scholarly.search_author_id('W-Ij6voAAAAJ')
      author = scholarly.fill(author)
      
      stats = {
          'citations': author['citedby'],
          'h_index': author['hindex'],
          'publications': len(author['publications']),
          'last_updated': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
          'recent_publications': []
      }
      
      publications = author['publications']
      publications.sort(key=lambda x: int(x['bib'].get('pub_year', '0')), reverse=True)
      
      for i, pub in enumerate(publications):
          filled_pub = scholarly.fill(pub)
          
          # Try to get the abstract from different possible locations
          abstract = (filled_pub.get('bib', {}).get('abstract') or 
                     filled_pub.get('abstract') or 
                     filled_pub.get('summary', 'Abstract not available'))
          
          pub_data = {
              'title': filled_pub['bib']['title'],
              'year': filled_pub['bib'].get('pub_year', 'Year Unknown'),
              'citation': filled_pub['bib'].get('citation', 'Citation not available'),
              'abstract': abstract,
              'url': filled_pub.get('pub_url', '#'),
              'authors': filled_pub['bib'].get('author', [])
          }
          
          # Print debug information
          print(f"\nProcessing publication: {pub_data['title']}")
          print(f"Abstract found: {abstract[:100]}..." if len(abstract) > 100 else abstract)
          
          stats['recent_publications'].append(pub_data)
          
      os.makedirs('assets/data', exist_ok=True)
      json_path = os.path.join(os.getcwd(), 'assets/data/scholar_stats.json')
      with open(json_path, 'w', encoding='utf-8') as f:
          json.dump(stats, f, ensure_ascii=False, indent=2)
          
      print("\nSuccessfully updated scholar stats and publications")
      
  except Exception as e:
      print(f"Error updating scholar stats: {str(e)}")
      raise e

if __name__ == "__main__":
  update_scholar_stats()